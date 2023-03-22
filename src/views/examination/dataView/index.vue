<template>
  <div class='main_dataView'>
<!--    <div class='top'>-->
<!--      <template v-for='item in labelList'>-->
<!--        <span @click='sortList(item)'>{{ item.label }}</span>-->
<!--      </template>-->
<!--    </div>-->
    <div class='top'>
      <a-radio-group v-model="selectIndex" style="width: 100%" @change='selectIndexs'>
        <a-table
          :columns="labelList"
          :data-source="data"
          :pagination='false'
          size='small'
          bordered
        >
          <template slot="selection" slot-scope="text, rec, index">
            <a-radio :value="index"/>
          </template>
        </a-table>
      </a-radio-group>
    </div>
    <div class='bot'>
      <div class='bot_con'>
        <a-button type="link" :disabled='pageNum === 1' @click='getList("first")'>
          <a-icon type="vertical-right" />
        </a-button>
        <a-button type="link" :disabled='pageNum === 1' @click='getList("back")'>
          <a-icon type="left" />
        </a-button>
        <div style='width: 50px;text-align: center;'>第{{ pageNum }}页</div>
        <a-select
          style="width: 80px"
          v-model='pageSize'
          size='small'
          :options='pageList'
          @change='handleChange'
        >
          <a-select-option v-for='(item, ind) in pageList' :key='ind' :value="item.value">{{ item.label }}</a-select-option>
        </a-select>
        <a-button type="link" :disabled='pageNum >= maxPage' @click='getList("next")'>
          <a-icon type="right" />
        </a-button>
        <a-button type="link" :disabled='pageNum >= maxPage' @click='getList("last")'>
          <a-icon type="vertical-left" />
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import drawingDefalut from '@/views/examination/components/generator/drawingDefalut'
import { formConf } from '@/views/examination/components/generator/config'
import { getDrawingList, getFormConf, getVersion, getIp, saveFormList } from '@/utils/db'
import { deepClone } from '@/utils/examination_index'
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
export default {
  name: 'index',
  components: {

  },
  props: {
    resultData: {
      type: Object,
      default: ()=> {}
    }
  },
  watch: {
    resultData: {
      handler(n, o) {
        console.log('提交后的', n, o)
        if(JSON.stringify(n) !== '{}') {
          let hasId = false
          this.dataCopy.forEach(item => {
            if(item.id === n.id) {
              hasId = true
            }
          })
          let result = {}
          this.drawingList.forEach(item => {
            for(let i in n.value) {
              if(item.__vModel__ === i){
                if(item.__config__.type === 'checkbox') {
                  item.__slot__.options.forEach(items => {
                    if(n.value[i].includes(items.value))  result[item.__vModel__] = result[item.__vModel__] + `, ${items.label}`;
                  })
                  result[item.__vModel__] = result[item.__vModel__].substr(10, result[item.__vModel__].length)
                }else if(item.__config__.type === 'radio' || item.__config__.type === 'select') {
                  item.__slot__.options.forEach(items => {
                    if(n.value[i] === items.value) result[item.__vModel__] = items.label
                  })
                } else {
                  result[item.__vModel__] = n.value[i]
                }
              }
            }
          })
          if (hasId){ this.data.map(item => {
            if(item.id === n.id) for(let i in result) { item[i] = result[i] }
            return item
          }); this.dataCopy.map(item => {
            if(item.id === n.id) for(let i in n.value) { item.value[i] = n[i] }
            return item
          })}
          else {
            this.dataCopy.push(n)
            const browser = getVersion() ;
            result.browser =  browser.browserName + '' + browser.browserVersion
            result.user = 'admin'
            result.osName = browser.osName + '' + browser.osVersion
            result.ip = ''
            result.id = n.id
            console.log('计算完成的', result)
            this.data.push(result)
            saveFormList(this.dataCopy)
          }
        }
        console.log('this.dataCopy,', this.dataCopy)
      },
      immediate: true
    }
  },
  data() {
    return {
      drawingList: [],
      formConf,
      labelList: [
        {
          title: '',
          width: 60,
          scopedSlots: { customRender: 'selection' },
          align: 'center'
        }
      ],
      columns: [],
      data: [],
      selectIndex: -1,
      dataCopy: [],
      formData: {},
      pageSize: 10,
      pageNum: 1,
      pageList: [
        { label: '10条', value: 10 },
        { label: '20条', value: 20 },
        { label: '30条', value: 30 },
        { label: '50条', value: 50 },
        { label: '100条', value: 100 },
      ],
      total: 103
    }
  },
  computed: {
    maxPage() {
      return this.total % this.pageSize === 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize )
    }
  },
  mounted() {
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      this.drawingList = drawingListInDB
    } else {
      this.drawingList = drawingDefalut
    }
    if (formConfInDB) {
      this.formConf = formConfInDB
    }
    console.log('this.drawingList', this.drawingList, this.formConf)
    const obj = {}
    this.drawingList.forEach(item => {
      if(item.__config__.type === 'texts') {
        this.labelList.push({
          title: '标题',
          dataIndex: item.__vModel__,
          sorter: (a,b)=>a[item.__vModel__].localeCompare(b[item.__vModel__])
        })
      } else {
        this.labelList.push({
          title: item.__config__.label,
          dataIndex: item.__vModel__,
          sorter: (a,b)=>`${a[item.__vModel__]}`.localeCompare(`${b[item.__vModel__]}`),
          width: 200,
          ellipsis: true
        })
      }
      obj[item.__vModel__] = undefined
    })
    const list = [
      {
        title: '用户',
        dataIndex: 'user',
        sorter: (a,b)=>a.user.localeCompare(b.user)
      },
      {
        title: '浏览器',
        dataIndex: 'browser',
        sorter: (a,b)=>a.browser.localeCompare(b.browser)
      },
      {
        title: '平台类型',
        dataIndex: 'osName',
        sorter: (a,b)=>a.osName.localeCompare(b.osName)
      },
      {
        title: 'ip',
        dataIndex: 'ip',
        sorter: (a,b)=>a.ip.localeCompare(b.ip)
      }
    ]
    this.labelList = this.labelList.concat(list)

  },
  methods: {
    sortList(obj) {
      let label = obj
      this.labelList.sort(()=> {
        return
      })
    },
    selectIndexs(val) {
      this.selectIndex = val.target.value
      this.$emit('selectInd', {
        ind: this.selectIndex
      })
    },
    isSelect() {
      let result = false
      const h = this.$createElement
      if(this.selectIndex < 0) {
        this.$notify({
          title: '信息提示',
          message: h('i', { style: 'color: red' }, '请先选择一条数据'),
        })
        result = false
      } else {
        result = true
      }
      return result
    },
    deleteItem() {
      this.data.splice(this.selectIndex, 1)
      this.selectIndex = -1
      this.selectIndexs()
    },
    editItem() {
      const data = deepClone(this.dataCopy)
      const list = data[this.selectIndex]
      const drawingList = deepClone(this.drawingList).map(item => {
        for(let i in list.value) {
          if(i === item.__vModel__) {
            item.__config__.defaultValue = list.value[i]
          }
        }
        return item
      })
      console.log('editView', drawingList)
      const formConf = {
        fields: drawingList,
        ...this.formConf
      }
      this.$emit('editView', {
        defaultValue: true,
        drawingList,
        formConf,
        id: list.id
      })
    },
    AssembleFormData() {
      this.formData = {
        fields: deepClone(this.drawingList),
        ...this.formConf
      }
    },
    run() {
      this.AssembleFormData()
      this.$emit('review', { formConf: this.formData, drawingList: this.drawingList })
    },
    getList(type) {
      switch (type) {
        case 'first':
          this.pageNum = 1
          break;
        case 'back':
          this.pageNum -= 1
          break;
        case 'next':
          this.pageNum += 1
          break;
        case 'last':
          this.pageNum = this.total % this.pageSize === 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize )
          break;
      }
    },
    handleChange(val) {
      this.pageNum = 1
    },
    exportExcel() {
      const json_fields = {}
      this.labelList.forEach(item => {
        json_fields[item.title] = item.dataIndex
      })
      const DetailsForm = this.data
      this.$emit('exportExcel', {
        json_fields,
        DetailsForm
      })
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .ant-table-header-column{
  font-size: 14px;
  font-weight: normal;
}
.main_dataView{
 ::v-deep .ant-table-column-sorters{
    display: flex !important;
   align-items: center;
  }
 ::v-deep .ant-table-column-title{
   display: inline-block !important;
   width: 80%;
 }
 ::v-deep .ant-table-column-sorter{
   display: inline-block !important;
 }
}
.main_dataView{
  height: 100%;
  .top{
    height: 96.5%;
  }
  .bot{
    height: 3.5%;
    display: flex;
    justify-content: center;
    background: aliceblue;
    .bot_con{
      display: flex;
      align-items: center;
    }
  }
}
</style>
