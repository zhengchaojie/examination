<template>
  <div class="setting" style="padding: 14px">
    <a-row>
      <a-col :span="6">
        <a-card class="card">
          <span slot="title"><a-icon type="file-text" style="margin-right: 10px; font-size: 18px" />问卷显示</span>
          <a-button v-if="!recycleFlag" slot="extra" type="primary" icon="caret-right" @click="recycle">
            正在回收
          </a-button>
          <a-button v-if="recycleFlag" slot="extra" type="danger" icon="pause" @click="recycle"> 暂停回收</a-button>
          <questionnaire />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="card">
          <span slot="title">
            <a-icon type="safety-certificate" style="margin-right: 10px; font-size: 18px" />回收设置
          </span>
          <recycle />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="card">
          <span slot="title"><a-icon type="notification" style="margin-right: 10px; font-size: 18px" />投放与分享</span>
          <deliverySharing />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="card">
          <span slot="title"><a-icon type="team" style="margin-right: 10px; font-size: 18px" />协作管理员列表</span>
          <a slot="extra" href="#" @click="addAdmin">添加协作管理员</a>
          <administrator />
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model="adminVisible" title="设置协作管理员" width="700px" :maskClosable="false" @ok="handleOk">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="成员">
          <a-select
            mode="multiple"
            style="width: 50%"
            placeholder="请选择机构"
            @change="mechanismChange"
            v-model="mechanism"
          >
            <a-select-option v-for="(i, j) in 5" :key="j">
              {{ i }}
            </a-select-option>
          </a-select>
          <a-select
            v-model="member"
            mode="multiple"
            style="width: 30%; margin-left: 40px"
            placeholder="请选择成员"
            @change="memberChange"
          >
            <a-select-option v-for="(i, j) in 5" :key="i">
              {{ i }}
            </a-select-option>
          </a-select>
          <div style="margin: 20px; height: 400px">
            <a-tag
              v-for="(item, index) in member"
              :key="index"
              color="blue"
              style="
                margin-right: 10px;
                background: #e6f7ff !important;
                border-color: #91d5ff !important;
                padding: 2px 10px;
              "
            >
              {{ item }}
            </a-tag>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="角色" force-render disabled> </a-tab-pane>
        <a-tab-pane key="3" tab="机构岗位" force-render disabled> </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import questionnaire from './components/questionnaire.vue'
import recycle from './components/recycle.vue'
import deliverySharing from './components/deliverySharing.vue'
import administrator from './components/administrator.vue'
export default {
  name: 'index',
  components: {
    questionnaire,
    recycle,
    deliverySharing,
    administrator,
  },
  data() {
    return {
      recycleFlag: false,
      adminVisible: false,
      mechanism: [],
      member: [],
    }
  },
  methods: {
    handleOk() {
      this.adminVisible = false
    },
    mechanismChange(value) {
      console.log(`selected ${value}`)
    },
    memberChange(value) {
      console.log(`selected ${value}`)
    },
    addAdmin() {
      this.adminVisible = true
    },
    callback(key) {
      console.log(key)
    },
    recycle() {
      this.recycleFlag = !this.recycleFlag
    },
  },
}
</script>

<style scoped>
.setting {
  background: #fafafa;
  height: 94vh;
}
.card {
  width: 99%;
}
</style>
