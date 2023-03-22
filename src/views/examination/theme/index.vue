<template>
  <div class="container">
    <div class="left-board">
      <div class="left-scrollbar">
        <div class="components-list">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="背景图">
              <div class='imgList'>
                <template v-for='item in bacList'>
                  <div class='img_detail' @mouseenter='item.used ? "" : item.show = true' @mouseleave='item.show = false' :key='item.name'>
                    <img class='imgs' :src='item.url' />
                    <div v-if='item.show' class='imgs_float' @click='imgSelected(item, "bacList")'>
                      <img class='imgs_' :src='addImg' />
                    </div>
                    <div v-else-if='item.used' class='imgs_float' @click='item.used = false;imgUrl = ""'>
                      <img class='imgs_' :src='delImg' />
                    </div>
                  </div>
                </template>
                <div class='img_detail' @click='visible = true;visible_type = "bac"'>
                  <img class='default_add' :src='default_add' />
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="页眉图">
              <div class='imgList'>
                <template v-for='item in headList'>
                  <div class='img_detail' @mouseenter='item.used ? "" : item.show = true' @mouseleave='item.show = false' :key='item.name'>
                    <img class='imgs' :src='item.url' />
                    <div v-if='item.show' class='imgs_float' @click='imgSelected(item, "headList")'>
                      <img class='imgs_' :src='addImg' />
                    </div>
                    <div v-else-if='item.used' class='imgs_float' @click='item.used = false;headerImg = ""'>
                      <img class='imgs_' :src='delImg' />
                    </div>
                  </div>
                </template>
                <div class='img_detail' @click='visible = true;visible_type = "header"'>
                  <img class='default_add' :src='default_add' />
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>

    <div class="center-board">
      <div class="center-scrollbar bacImg" :style="{ 'background-image': `url(${ imgUrl })` }">
        <div class="center-board-row" >
          <headers v-if='headerImg' :img='headerImg' @showoperate='showoperate' />
          <a-form-model
            :ref="formConf.formRef"
            class="form-index-container ant-form-vertical"
            :model="model"
          >
            <buildItem
              v-for='(item, ind) in drawingList'
              v-model='model[item.__vModel__]'
              :record='item'
              :model.sync='model'
              :ind='ind'
              :key='item.__vModel__ + ind'
              :disabled='item.disabled'
            />
          </a-form-model>
        </div>
      </div>
    </div>

    <div class='right-board'>
      <div v-if='pageHeader' class='right_img'>
        <span>背景图片</span>
        <span class='right_img_operate' @click='imgUrl = ""'>移除</span>
      </div>
      <div v-if='pageHeader' class='right_img'>
        <span>页眉图片</span>
        <span class='right_img_operate' @click='headerImg = ""'>移除</span>
      </div>
    </div>
    <a-modal
      :visible.sync="visible"
      width="50%"
      :title='visible_type === "bac" ? "背景图详情" : "页眉图详情"'
      :footer='null'
      @cancel='visible = false'
    >
      <template >
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="bacList"
          @change="handleChange"
        >
          <div v-if="bacList.length < 999">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传
            </div>
          </div>
        </a-upload>
      </template>
      <template v-if='visible_type === "header"'>
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="headList"
          @change="handleChange"
        >
          <div v-if="headList.length < 999">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传
            </div>
          </div>
        </a-upload>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getDrawingList, getFormConf, getFormList, saveFormConf } from '@/utils/db'
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const formList = getFormList()
import headers from '@/views/examination/build/header'
import build from '@/views/examination/build'
import drawingDefalut from '@/views/examination/components/generator/drawingDefalut'
import { deepClone } from '@/utils/examination_index'
import buildItem from '@/views/examination/build/buildItem'
export default {
  components: {
    headers,
    build,
    buildItem
  },
  data() {
    return {
      formData: {},
      generateConf: null,
      showFileName: false,
      imgUrl: require('@/views/examination/assets/bac.jpeg'),
      headerImg: require('@/views/examination/assets/header.png'),
      bacList: [
        { name: '风景', url: 'https://pic35.photophoto.cn/20150511/0034034892281415_b.jpg', show: false, used: false },
        { name: '雪山', url: 'https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg', show: false, used: false } ],
      headList: [ { show: false, used: false, name: '晚霞', url: 'https://ts1.cn.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0' } ],
      reviewData: {},
      drawingListInDB,
      formConfInDB,
      formConf: {},
      formList,
      formConfCopy: {},
      model: {},
      drawingList: [],
      addImg: require('@/views/examination/assets/used.png'),
      delImg: require('@/views/examination/assets/del.png'),
      visible: false,
      visible_type: 'bac',
      pageHeader: false,
      default_add: require('@/views/examination/assets/add.png')
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      this.drawingList = deepClone(drawingListInDB)
    } else {
      this.drawingList = deepClone(drawingDefalut)
    }
    if (formConfInDB) {
      this.reviewData.formConf = formConfInDB
    }
  },
  mounted() {
    console.log('reviewData', this.reviewData)
  },
  methods: {
    showoperate(val) {
      console.log('传递进来')
      this.pageHeader = true
    },
    handleChange({ fileList }) {
      console.log('fileList', fileList)
    },
    imgSelected(obj, list) {
      list === 'bacList' ? this.imgUrl = obj.url : this.headerImg = obj.url
      this[list].map(item => {
        item.used = false
        if(obj.name === item.name){
          item.used = true
        }
        return item
      })
    },
    initFormData(componentList, formData) {
      console.log('componentList', componentList)
      componentList.forEach(cur => {
        const config = cur.__config__
        console.log('传过来的', this.edit)
        if(this.edit) this.$set(this.model, cur.__vModel__, cur.__config__.defaultValue)
        else if (cur.__vModel__) this.$set(this.model, cur.__vModel__, undefined)
        if (config.type === 'texts') this.$set(this.model, cur.__vModel__, config.desc_texts)
        if (config.type === 'upload')  this.$set(this.model, cur.__vModel__, [])
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder }
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array'
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined && (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.__vModel__] = config.regList.map(item => {
            item.pattern && (item.pattern = eval(item.pattern))
            item.trigger = ruleTrigger && ruleTrigger[config.tag]
            return item
          })
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    }
  }
}
</script>

<style lang='scss'>
.ant-form-item{
  padding-bottom: 12px;
}
@import '@/views/examination/styles/home';
</style>
<style lang='scss' scoped>
.imgList{
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  .img_detail{
    width: 75px;
    height: 75px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f0f3f5;
    position: relative;
    margin-right: 5px;
    .imgs{
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
    .default_add{
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
    .imgs_float{
      width: 60px;
      height: 60px;
      cursor: pointer;
      background: rgba(0,0,0, .4);
      position: absolute;
      top: 7.5px;
      left: 7.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      .imgs_{
        width: 20px;
      }
    }
  }
}
.bacImg{
  background-repeat: no-repeat;
  background-size: cover;
}
.right-board{
  padding: 8px;
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  .right_img{
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #222222;
    border-bottom: 1px solid #939393;
    .right_img_operate{
      color: #2472df;
      cursor: pointer;
    }
  }
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>