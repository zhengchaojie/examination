<template>
  <div class="content">
    <div class="switchBox">
      <span>需要登录</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isLoginChange" />
    </div>
    <div class="switchBox">
      <span>只能微信填写</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isWxChange" />
    </div>
    <div class="switchBox">
      <span>凭密码填写</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isPasswordChange" />
    </div>
    <div class="switchBox">
      <span>每台电脑或手机答题次数限制</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isCountChange" />
    </div>
    <div class="switchBox">
      <span>每个IP答题次数限制</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isIpCountChange" />
    </div>
    <div class="switchBox">
      <span>每个登录账号答题次数限制</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isAnswerCountChange" />
    </div>
    <div class="switchBox">
      <span>设置问卷结束时间</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isEndChange" />
    </div>
    <div class="switchBox">
      <span>设置问卷回收上限</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isRecycleChange" />
    </div>
    <div class="switchBox">
      <span>答题白名单设置</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <div class="switch">
        <a href="#" style="margin-right: 10px" @click="setting">设置</a>
        <a-radio-group default-value="1" button-style="solid" @change="isWhiteChange" size="small">
          <a-radio-button value="1"> 系统用户 </a-radio-button>
          <a-radio-button value="2"> 外部用户 </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <a-modal v-model="settingVisible" title="白名单设置" :footer="null" width="800px" :maskClosable="false">
      <div style="margin-bottom: 10px">
        <span>白名单答题限制</span>
        <a-switch @change="whiteOnChange" class="whiteSwitch" />
      </div>
      <a-card style="width: 100%; padding: 20px">
        <a-form layout="inline">
          <a-form-item label="名单">
            <a-input placeholder="请输入" allow-clear />
          </a-form-item>
          <a-form-item label="状态">
            <a-select placeholder="请选择" style="width: 200px" @change="handleChange" allow-clear>
              <a-select-option value="1"> 未访问 </a-select-option>
              <a-select-option value="2"> 已访问 </a-select-option>
              <a-select-option value="3"> 已答题 </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item style="float: right">
            <a-button style="margin-right: 10px"> 重置 </a-button>
            <a-button type="primary"> 查询 </a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card style="width: 100%; padding: 20px; margin-top: 20px">
        <div style="float: right; margin: 0 10px 20px 0">
          <a-button type="primary" icon="plus"> 添加白名单 </a-button>
          <a-button type="primary" icon="file-excel" style="margin: 0 10px"> 导入白名单 </a-button>
          <a-button icon="file-excel"> 下载 </a-button>
          <a-button :disabled="true" style="margin-left: 10px"> 批量删除 </a-button>
        </div>
        <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" bordered>
          <span slot="action">
            <a class="ant-dropdown-link"> 删除 </a>
          </span>
          <span slot="status" slot-scope="text">
            <span v-if="text == 1">未访问</span>
            <span v-if="text == 2">已访问</span>
            <span v-if="text == 3">已答题</span>
          </span>
        </a-table>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      settingVisible: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: '名单',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [
        {
          key: 1,
          number: '1',
          name: '张三',
          status: '1',
        },
        {
          key: 2,
          number: '2',
          name: '李四',
          status: '2',
        },
      ],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows)
        },
      },
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    handleSubmit(e) {},
    whiteOnChange(checked) {
      console.log(checked)
    },
    setting() {
      this.settingVisible = true
    },
    isLoginChange(checked) {
      console.log(`需要登录： ${checked}`)
    },
    isWxChange(checked) {
      console.log(`只能微信填写： ${checked}`)
    },
    isPasswordChange(checked) {
      console.log(`凭密码填写： ${checked}`)
    },
    isCountChange(checked) {
      console.log(`每台电脑或手机答题次数限制： ${checked}`)
    },
    isIpCountChange(checked) {
      console.log(`每个IP答题次数限制： ${checked}`)
    },
    isAnswerCountChange(checked) {
      console.log(`每个登录账号答题次数限制： ${checked}`)
    },
    isEndChange(checked) {
      console.log(`设置问卷结束时间： ${checked}`)
    },
    isRecycleChange(checked) {
      console.log(`设置问卷回收上限： ${checked}`)
    },
    isWhiteChange(checked) {
      console.log(`答题白名单设置： ${checked}`)
    },
  },
}
</script>

<style scoped>
.whiteSwitch {
  margin-left: 10px;
}
::v-deep .ant-modal-close-x {
  line-height: 46px;
}
::v-deep .ant-modal-header {
  padding: 14px 16px !important;
  background: #fff !important;
}
.switchBox {
  position: relative;
  margin: 24px 10px;
  font-size: 15px;
}
.switch {
  position: absolute;
  right: 0;
  top: 0;
}
.content {
  padding: 0 14px;
}
</style>