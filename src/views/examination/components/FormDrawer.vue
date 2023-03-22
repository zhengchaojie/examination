<template>
  <div>
    <a-drawer v-bind="$attrs" v-on="$listeners" :visible.sync="drawerVisible">
      <div style="height:100%">
        <a-row style="height:100vh;overflow:auto">
          <a-col :md="24" :lg="12" class="left-editor">
            <div class="setting" title="资源引用" @click="showResource">
              <a-badge :is-dot="!!resources.length" class="item">
                <i class="el-icon-setting" />
              </a-badge>
            </div>
            <a-tabs v-model="activeTab" size="large" type="card" class="editor-tabs">
              <a-tab-pane key="html">
                <span slot="tab">
                  <a-icon
                    :type="activeTab==='html' ? 'edit' : 'code'"
                    :style="{ color: activeTab==='html' ? '#f1fa8c' : '#a95812'}"
                  />
                  template
                </span>
              </a-tab-pane>
              <a-tab-pane key="js">
                <span slot="tab">
                  <a-icon
                    :type="activeTab==='js' ? 'edit' : 'code'"
                    :style="{ color: activeTab==='js' ? '#f1fa8c' : '#a95812'}"
                  />
                  script
                </span>
              </a-tab-pane>
              <a-tab-pane key="css">
                <span slot="tab">
                  <a-icon
                    :type="activeTab==='css' ? 'edit' : 'code'"
                    :style="{ color: activeTab==='css' ? '#f1fa8c' : '#a95812'}"
                  />
                  css
                </span>
              </a-tab-pane>
              <!-- <template slot="tabBarExtraContent">
                <a-tooltip>
                  <template slot="title">
                    资源引用
                  </template>
                  <a-button
                    type="primary"
                    shape="circle"
                    :style="{marginRight: '20px'}"
                    icon="sliders"
                    size="small"
                    @click="showResource"
                  />
                </a-tooltip>
              </template> -->
            </a-tabs>
            <div v-show="activeTab==='html'" id="editorHtml" class="tab-editor" />
            <div v-show="activeTab==='js'" id="editorJs" class="tab-editor" />
            <div v-show="activeTab==='css'" id="editorCss" class="tab-editor" />
          </a-col>
          <a-col :md="24" :lg="12" class="right-preview">
            <div class="action-bar" :style="{'text-align': 'left'}">
              <span class="bar-btn" @click="runCode">
                <i class="el-icon-refresh" />
                刷新
              </span>
              <span class="bar-btn" @click="exportFile">
                <i class="el-icon-download" />
                导出vue文件
              </span>
              <span ref="copyBtn" class="bar-btn copy-btn">
                <i class="el-icon-document-copy" />
                复制代码
              </span>
              <span class="bar-btn delete-btn" @click="drawerVisible = false">
                <i class="el-icon-circle-close" />
                关闭
              </span>
            </div>
            <iframe
              v-show="isIframeLoaded"
              ref="previewPage"
              class="result-wrapper"
              frameborder="0"
              src="preview.html"
              @load="iframeLoad"
            />
            <a-spin :spinning="!isIframeLoaded" />
            <!-- <div v-show="!isIframeLoaded" class="result-wrapper" /> -->
          </a-col>
        </a-row>
      </div>
    </a-drawer>
    <resource-dialog
      :visible.sync="resourceVisible"
      :origin-resource="resources"
      @save="setResource"
    />
  </div>
</template>
<script>
import { parse } from '@babel/parser'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/views/examination/components/generator/html'
import { makeUpJs } from '@/views/examination/components/generator/js'
import { makeUpCss } from '@/views/examination/components/generator/css'
import { exportDefault, beautifierConf, titleCase } from '@/utils/examination_index'
import ResourceDialog from './ResourceDialog'
import loadMonaco from '@/utils/loadMonaco'
import loadBeautifier from '@/utils/loadBeautifier'

const editorObj = {
  html: null,
  js: null,
  css: null
}
const mode = {
  html: 'html',
  js: 'javascript',
  css: 'css'
}
let beautifier
let monaco

export default {
  components: { ResourceDialog },
  props: ['formData', 'generateConf'],
  data() {
    return {
      activeTab: 'html',
      htmlCode: '',
      jsCode: '',
      cssCode: '',
      codeFrame: '',
      isIframeLoaded: false,
      isInitcode: false, // 保证open后两个异步只执行一次runcode
      isRefreshCode: false, // 每次打开都需要重新刷新代码
      resourceVisible: false,
      scripts: [],
      links: [],
      monaco: null,
      drawerVisible: false
    }
  },
  computed: {
    resources() {
      return this.scripts.concat(this.links)
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    window.addEventListener('keydown', this.preventDefaultSave)
    const clipboard = new ClipboardJS('.copy-btn', {
      text: trigger => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.preventDefaultSave)
  },
  methods: {
    preventDefaultSave(e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    },
    onOpen() {
      this.drawerVisible = true
      this.$nextTick(() => {
        const { type } = this.generateConf
        this.htmlCode = makeUpHtml(this.formData, type)
        this.jsCode = makeUpJs(this.formData, type)
        this.cssCode = makeUpCss(this.formData)
        loadBeautifier(btf => {
          beautifier = btf
          this.htmlCode = beautifier.html(this.htmlCode, beautifierConf.html)
          this.jsCode = beautifier.js(this.jsCode, beautifierConf.js)
          this.cssCode = beautifier.css(this.cssCode, beautifierConf.html)
          loadMonaco(val => {
            monaco = val
            this.setEditorValue('editorHtml', 'html', this.htmlCode)
            this.setEditorValue('editorJs', 'js', this.jsCode)
            this.setEditorValue('editorCss', 'css', this.cssCode)
            if (!this.isInitcode) {
              this.isRefreshCode = true
              this.isIframeLoaded && (this.isInitcode = true) && this.runCode()
            }
          })
        })
      })
    },
    onClose() {
      this.isInitcode = false
      this.isRefreshCode = false
    },
    iframeLoad() {
      if (!this.isInitcode) {
        this.isIframeLoaded = true
        this.isRefreshCode && (this.isInitcode = true) && this.runCode()
      }
    },
    setEditorValue(id, type, codeStr) {
      if (editorObj[type]) {
        editorObj[type].setValue(codeStr)
      } else {
        editorObj[type] = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: mode[type],
          automaticLayout: true
        })
      }
      // ctrl + s 刷新
      editorObj[type].onKeyDown(e => {
        if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
          this.runCode()
        }
      })
    },
    runCode() {
      const jsCodeStr = editorObj.js.getValue()
      try {
        const ast = parse(jsCodeStr, { sourceType: 'module' })
        const astBody = ast.program.body
        if (astBody.length > 1) {
          this.$confirm(
            'js格式不能识别，仅支持修改export default的对象内容',
            '提示',
            {
              type: 'warning'
            }
          )
          return
        }
        if (astBody[0].type === 'ExportDefaultDeclaration') {
          const postData = {
            type: 'refreshFrame',
            data: {
              generateConf: this.generateConf,
              html: editorObj.html.getValue(),
              js: jsCodeStr.replace(exportDefault, ''),
              css: editorObj.css.getValue(),
              scripts: this.scripts,
              links: this.links
            }
          }

          this.$refs.previewPage.contentWindow.postMessage(
            postData,
            location.origin
          )
        } else {
          this.$message.error('请使用export default')
        }
      } catch (err) {
        this.$message.error(`js错误：${err}`)
        console.error(err)
      }
    },
    generateCode() {
      const html = vueTemplate(editorObj.html.getValue())
      const script = vueScript(editorObj.js.getValue())
      const css = cssStyle(editorObj.css.getValue())
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    exportFile() {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.vue`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.vue`
        const codeStr = this.generateCode()
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, value)
      })
    },
    showResource() {
      this.resourceVisible = true
    },
    setResource(arr) {
      const scripts = []; const
        links = []
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          if (item.endsWith('.css')) {
            links.push(item)
          } else {
            scripts.push(item)
          }
        })
        this.scripts = scripts
        this.links = links
      } else {
        this.scripts = []
        this.links = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/views/examination/styles/mixin.scss';
.tab-editor {
  position: absolute;
  top: 33px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}
.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}
.setting{
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}
.right-preview {
  height: 100%;
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
@include action-bar;
::v-deep .el-drawer__header {
  display: none;
}
</style>
