<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'CommonScriptFunction',
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 选中的主键集合
      selectedRowKeys: [],
      // 选中的数据集合
      selectedRows: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // label的百分比
      labelCol: { span: 6 },
      // 内容区域的百分比
      wrapperCol: { span: 18 },
      // 脚本函数库表格数据
      commonScriptFunctionList: [],
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParam: {
        pageNum: 1,
        pageSize: 20,
        functionName: undefined,

        functionAlias: undefined,

        functionContent: undefined,

        status: undefined,
      },
      columns: [
        {
          title: '函数名称',
          dataIndex: 'functionName',
          align: 'center',
          width: '22.5%',
        },
        {
          title: '函数别名',
          dataIndex: 'functionAlias',
          align: 'center',
          width: '22.5%',
        },
        {
          title: '函数内容',
          dataIndex: 'functionContent',
          align: 'center',
          width: '22.5%',
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          align: 'center',
          width: '22.5%',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  created() {

  },
  methods: {
  },
}
</script>
