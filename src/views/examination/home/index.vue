<template>
  <div class="form-index-container">
    <a-card class="header-container">
      <div style="height: 50px;display: flex;justify-content: space-between; align-items: center;">
        <a-icon type="left"  @click="$router.back(-1)" />
        <div v-if='activeRouter === "/edit"'>
          <a-button type="primary" icon="eye" @click="review">
            预览
          </a-button>
          <a-button icon="file-text" @click="showJsons">
            查看Json
          </a-button>
          <a-button type="success" icon="plus" @click="saveProjectAsTemplateHandle">
            保存
          </a-button>
          <a-button icon="delete" type="link" @click="empty">
            清空
          </a-button>
        </div>
        <div v-if='activeRouter === "/dataView"' style='display: flex;'>
<!--          <template v-if='showExcel'>-->
<!--            <JsonExcel-->
<!--              class="export-excel-wrapper"-->
<!--              :data="DetailsForm"-->
<!--              :fields="json_fields"-->
<!--              header="问卷调查"-->
<!--              name="问卷调查.xls"-->
<!--            >-->
<!--              <a-button ref='excel' class='aBtn' type="link" @click=''>123</a-button>-->
<!--            </JsonExcel>-->
<!--          </template>-->
          <template v-for='item in actions'>
            <a-button  class='aBtn' type="link" :icon="item.icon" @click='menuActions(item)'>
              {{ item.name }}
            </a-button>
          </template>
        </div>
        <div v-if='activeRouter === "/theme"'>
          <a-button type="success" icon="plus" @click="saveTheme">
            保存
          </a-button>
        </div>
      </div>
    </a-card>
    <div class="main-container">
      <div class="left-menu-container">
        <a-menu :inline-collapsed="isCollapse" mode="inline" :default-selected-keys="defaultActiveMenu"
                class="a-menu-vertical" @select="menuSelectHandle"
        >
          <a-menu-item v-for="menuItem in menuItemList" :key="menuItem.route" :index="menuItem.route">
            <div style='display: flex;align-items: center;'>
              <a-icon :type="menuItem.icon" />
              <span>{{ menuItem.title }}</span>
            </div>
          </a-menu-item>
        </a-menu>
        <div class='bot_icon'>
          <a-icon v-if="!isCollapse" type="double-left" @click="collapseHandle" />
          <a-icon v-else type="double-right" @click="collapseHandle" />
        </div>
      </div>
      <div ref='right_cont' class="right-content-container">
        <router-view ref="childMethods"
                     :result-data='resultData'
                     @editView='editView'
                     @exportExcel='exportExcel'
                     @review='receiveReview'
                     @selectInd='selectInd' />
      </div>
    </div>
    <a-modal
      :visible.sync="previewDialogVisible"
      width="70%"
      :title='title'
      :footer='null'
      @cancel='previewDialogVisible = false'
    >
      <examViews v-if='previewDialogVisible' ref='examViews' :review='reviewData' :edit='isEdit' @resubmit='resubmit' />
    </a-modal>
    <a-modal
      :visible.sync="loginVisible"
      width="50%"
      title='登录'
      @ok='login'
      @cancel='loginVisible = false'
    >
      <a-form-model :model="form">
        <a-form-model-item label="账号">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="form.pwd" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
// import PreView from '@/views/form/preview'
// import TemplateCreate from '@/views/project/template/create'
import examViews from '@/views/examination/examViews'
import DraggableItem from '@/views/examination/components/DraggableItem'
import Vue from 'vue'
Vue.component('DraggableItem', DraggableItem)

export default {
  name: 'index',
  components: {examViews},
  data() {
    return {
      previewKey: +new Date(),
      previewDialogVisible: false,
      defaultActiveMenu: ['/views'],
      projectKey: null,
      isCollapse: false,
      menuItemList: [
        {
          title: '概述',
          icon: 'desktop',
          route: '/views'
        },
        {
          title: '编辑',
          icon: 'edit',
          route: '/edit'
        },
        // {
        //   title: '逻辑',
        //   icon: 'contacts',
        //   route: '/examinationContacts'
        // },
        {
          title: '外观',
          icon: 'eye',
          route: '/theme'
        },
        {
          title: '设置',
          icon: 'setting',
          route: '/setting'
        },
        {
          title: '数据',
          icon: 'hdd',
          route: '/dataView'
        },
        {
          title: '统计',
          icon: 'line-chart',
          route: '/count'
        },
        {
          title: '项目',
          icon: 'fire',
          route: '/examinationFire'
        }
      ],
      reviewData: {},
      loginVisible: false,
      form: {
        name: 'admin',
        pwd: '123456'
      },
      actions: [
        { name: '添加数据', icon: 'plus' }, { name: '编辑数据', icon: 'edit' }, { name: '删除数据', icon: 'minus' },
        { name: '导出数据', icon: 'cloud-upload' }, { name: '导入数据', icon: 'cloud-download' }, { name: '回收站', icon: 'inbox' }
      ],
      ind: undefined,
      title: '问卷展示',
      resultData: {},
      isEdit: false,
      DetailsForm: [
        {
          date: "2022-3-10",
          details: "卸油区过路灯损坏",
          measure: "更换灯泡",
          timeLimit: "2022-3-21",
          plan: "先使用充电灯代替,贴好安全提醒告示",
          personInCharge: "王xx",
          preparer: "王xx",
          fund: "20元",
          complete: "已完成整改",
          remark: "重新更换了灯泡"
        }
      ],
      json_fields: {
        "排查日期":'date',
        "整改隐患内容":'details',
        "整改措施":'measure',
        "整改时限":'timeLimit',
        "应急措施和预案":'plan',
        "整改责任人":'personInCharge',
        "填表人":'preparer',
        "整改资金":'fund',
        "整改完成情况":'complete',
        "备注":'remark'
      },
      showExcel: false
    }
  },
  created() {
    // this.projectKey = this.$route.query.key
    // this.defaultActiveMenu = '/edit'
    // this.isCollapse = this.$store.state.form.isCollapse
  },
  computed: {
    activeRouter() {
      return this.$route.path
    }
  },
  mounted() {
  },
  methods: {
    handleOk() {
      this.$refs.examViews.submit()
    },
    selectInd(obj) {
      this.ind = obj.ind
    },
    menuSelectHandle(obj) {
      if(obj.key === '') {

      }
      if (this.$route.path !== obj.key) {
        this.$router.push({ path: obj.key })
      }
      // this.$router.push({ path:  obj.key })
      // this.$router.replace({path: })
    },
    openPreviewHandle() {
      this.previewKey = +new Date()
      this.previewDialogVisible = true
    },
    saveProjectAsTemplateHandle() {
      this.review()
      // const data = {
      //   id: new Date(),
      //   survey: this.reviewData.formConf
      // }
      // examine.updateExamine(data).then(res => {
      //
      // })
      if (!token) {
        this.loginVisible = true
      } else {

      }
    },
    login() {
      const data = {
        username: this.form.name,
        password: this.form.pwd
      }
      examine.login(data).then(res => {
        console.log('res', res)
      })
    },
    collapseHandle() {
      this.isCollapse = !this.isCollapse
    },
    review() {
      this.$refs['childMethods'].run()
    },
    receiveReview(data){
      this.reviewData = data
      this.previewDialogVisible = true
      console.log('data', data)
    },
    empty() {
      this.$refs['childMethods'].empty()
    },
    showJsons() {
      this.$refs['childMethods'].showJson()
    },
    menuActions(obj) {
      switch (obj.name) {
        case '添加数据':
          this.review()
          this.edit = false
          break
        case '编辑数据':
          if(this.isSelect()) {
            this.$refs.childMethods.editItem()
          }
          break
        case '删除数据':
          if(this.isSelect()) {
            this.$refs.childMethods.deleteItem()
          }
          break
        case '导出数据':
          this.showExcel = false
          this.$refs.childMethods.exportExcel()
          break
        case '导入数据':
          break
        case '回收站':
          break
      }
    },
    isSelect() {
      const result = this.$refs.childMethods.isSelect()
      return result
    },
    resubmit(obj) {
      this.resultData = obj
      this.previewDialogVisible = false
    },
    editView(obj) {
      this.isEdit = obj.defaultValue
      this.reviewData = {
        drawingList: obj.drawingList,
        formConf: obj.formConf,
        id: obj.id
      }
      console.log('this.reviewData', this.reviewData)
      this.previewDialogVisible = true
    },
    downExcel() {
      this.showExcel = true
      this.$nextTick(()=> {
        this.$refs.excel.$el.click()
      })
    },
    exportExcel(obj) {
      this.json_fields = obj.json_fields
      this.DetailsForm = obj.DetailsForm
      console.log('json_fields', this.json_fields)
      this.downExcel()
    },
    saveTheme() {

    }
  }
}
</script>
<style lang='scss'>
.form-index-container {
  .ant-form-vertical .ant-form-item{
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
.form-index-container {
  height: 100%;
  width: 100%;
  .ant-menu-item{
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
  ::v-deep .ant-form-item-required{
    padding-left: 10px;
    display: flex;
    //flex-direction: column;
  }
  ::v-deep .ant-form-item-required::before{
    line-height: 30px;
    left: 2px;
    top: 0;
  }
  ::v-deep .ant-form-item-label > label::after{
    content: '';
  }
  ::v-deep .ant-menu-item-selected{
    color: #2472df !important;
  }
  ::v-deep .ant-form-item-label > label{
    display: flex;
  }
  ::v-deep .ant-form-item-label{
    text-align: left;
    white-space: normal;
    line-height: 1.5;
  }
}

::v-deep .el-card__body {
  padding: 0;
}

::v-deep .a-menu {
  border: none;
  background-color: transparent;
}

.header-container {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  .el-icon-back {
    font-size: 22px;
    font-weight: 550;
    cursor: pointer;
    color: #000;
    margin-right: 75px;

    &:hover {
      color: rgb(32, 160, 255);
    }
  }

  .header-logo {
    height: 35px;
    width: 160px;
    vertical-align: middle;
  }
}

.main-container {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: row;

  .right-content-container {
    width: calc(100vw - 100px);
    height: calc(100vh - 50px);
    overflow-x: hidden;
  }
}

.left-menu-container {
  max-width: 100px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: solid 1px #e6e6e6;

  .a-menu-vertical:not(.a-menu--collapse) {
    min-height: 400px;
  }

}

::v-deep.preview-container {
  background-color: #ffffff;
}
.bot_icon{
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bot_icon:hover {
  color: #2472df;
}
.aBtn{
  margin-left: 10px;
}
</style>
