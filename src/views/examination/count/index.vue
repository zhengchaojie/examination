<template>
  <div class='main'>
    <div class='left'></div>
    <div class='center'>
      <template v-for='(item, ind) in drawingList'>
        <template v-if='item.data && item.data.length > 0'>
          <div class='drawing'>
            <div class='drawing_left'>
              <div class='title' :title='item.__config__.label' :ref='item.titleKey'>{{ item.__config__.label }}</div>
              <div class='con'>
                <div class='operator'>
                  <div class='operator-item' @click='switchType(item, "bar", ind)'>柱状图</div>
                  <div class='operator-item' @click='switchType(item, "pie", ind)'>扇形图</div>
                  <div class='operator-item' @click='switchType(item, "down", ind)'><a-icon type="cloud-download" /></div>
                </div>
                <div>
                  <bar v-if='item.type === "bar"' :ref='item.__vModel__' :list='item.data'  />
                  <pie v-else-if='item.type === "pie"' :ref='item.__vModel__' :list='item.data'/>
                </div>
              </div>
            </div>
            <div class='drawing_right'>
              <div class='title' :style='{ height: item.height }'>
                <div class='type'>类型: {{ isType(item.__config__.type) }}</div>
                <div class='required'>必填: {{ item.__config__.required ? '是' : '否' }}</div>
                <div class='sum'>{{ item.sum }}条数据</div>
              </div>
              <a-table
                :columns="labelList"
                :data-source="item.data"
                :pagination='false'
                :rowKey="(r, i) => i"
                size='small'
                bordered
              >
              </a-table>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class='right'></div>
  </div>
</template>

<script>
import { getDrawingList, getFormConf, getFormList } from '@/utils/db'
import drawingDefalut from '@/views/examination/components/generator/drawingDefalut'
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const formList = getFormList()
import { deepClone } from '@/utils/examination_index'
import pie from './components/pie'
import bar from './components/bar'
export default {
  name: 'index',
  components: {
    bar,
    pie
  },
  data() {
    return {
      drawingListInDB,
      formConfInDB,
      formConf: {},
      formList,
      drawingList: [],
      formList_copy: [],
      labelList: [
        {
          title: '标题',
          dataIndex: 'name'
        },
        {
          title: '数据量',
          dataIndex: 'value',
          sorter: (a, b) => a.value - b.value
        },
        {
          title: '占比',
          dataIndex: 'percentage',
          sorter: (a,b)=>a['percentage'].localeCompare(b['percentage'])
        }
      ],
      type: 'bar'
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
    this.formList_copy = deepClone(this.formList)
    this.transData()
    this.getList()
  },
  computed: {

  },
  methods: {
    getList() {
      const list = ['radio', 'select', 'checkbox']
      this.drawingList.forEach(item => {
        if(list.includes(item.__config__.type)) {
          item.data = []
          item.__slot__.options.forEach(opt => {
            item.data.push({ value: 0, name: opt.label })
          })
        }
      })
      this.drawingList.forEach(item => {
        if(item.data) {
          item.data.map(data => {
            this.formList_copy.forEach(items => {
              for (let k in items.label) {
                if(item.__vModel__ === k && items.label[k].includes(data.name)) {
                  data.value += 1
                  // if(isArray(items.label[k])) {
                  //
                  // } else {
                  //
                  // }
                }
              }
            })
            return data
          })
        }
      })
      this.drawingList.map(item => {
          if(item.data) {
            item.sum = 0
            // item.type = 'bar'
            this.$set(item, 'titleKey', `a${item.__vModel__}`)
            this.$set(item, 'height', '21px')
            this.$set(item, 'type', 'bar')
            item.data.forEach(items => {
              item.sum += items.value
              item.percentage = item.sum
            })
          }
          return item
      })
      this.$nextTick(()=> {
        this.drawingList.map(item => {
          if(item.data) {
            let refs = item.titleKey
            item.height = this.$refs[`${ refs }`][0].offsetHeight + 'px'
            item.data.forEach(items => {
              items.percentage = this.Percentage(items.value, item.sum)
            })
          }
          return item
        })
      })
    },
    transData() {
      this.formList_copy.map(n => {
        n.label= {}
        this.drawingList.forEach(item => {
          for(let i in n.value) {
            if(item.__vModel__ === i){
              if(item.__config__.type === 'checkbox') {
                n.label[item.__vModel__] = []
                item.__slot__.options.forEach(items => {
                  if(n.value[i].includes(items.value))  n.label[item.__vModel__].push(`${items.label}`);
                })
                // n[item.__vModel__] = n[item.__vModel__].substr(10, n[item.__vModel__].length)
              }else if(item.__config__.type === 'radio' || item.__config__.type === 'select') {
                item.__slot__.options.forEach(items => {
                  if(n.value[i] === items.value) n.label[item.__vModel__] = items.label
                })
              }
            }
          }
        })
        return n
      })
    },
    isType(type) {
      let result = '题目'
      switch (type) {
        case 'select':
          result = '下拉题'
          break;
        case 'radio':
          result = '单选题'
          break;
        case 'checkbox':
          result = '多选题'
          break;
      }
      return result
    },
    switchType(obj, type, ind) {
      switch (type) {
        case 'bar':
          obj.type = 'bar'
          break;
        case 'pie':
          obj.type = 'pie'
          break;
        case 'down':
          this.$refs[`${obj.__vModel__}`][0].savePic()
          break;
      }
    },
    Percentage(num, total) {
      if (num == 0 || total == 0){
        return 0;
      }
      return (Math.round(num / total * 10000) / 100.00) + '%';
    }
  }
}
</script>

<style scoped lang='scss'>
.main{
  width: 100%;
  display: flex;
  background: #f5f5f5;
  height: 100%;
  justify-content: space-between;
  .left, .right{
    width: 24%;
    background: #ffffff;
  }
  .center{
    width: 50%;
    background: #ffffff;
    margin-top: 1%;
    height: calc(100% - 4%);
    padding: 10px 15px;
    overflow-y: auto;
    .drawing{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      .drawing_left{
        width: 49%;
        .con{
          width: 100%;
          border: 1px solid #f0f0f0;
          .operator{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background-color: #fafafa;
            border-bottom: 1px solid #f0f0f0;
            height: 39px;
            color: #1890ff;
            font-size: 14px;
            .operator-item{
              margin-right: 8px;
              cursor: pointer;
            }
          }
        }
      }
      .drawing_right{
        width: 49%;

      }
      .title{
        display: flex;
        width: 100%;
        justify-content: space-between;
        overflow-y: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        margin-bottom: 5px;
      }
    }
  }
  ::v-deep .ant-table-wrapper{
    padding: 0;
  }
}
</style>