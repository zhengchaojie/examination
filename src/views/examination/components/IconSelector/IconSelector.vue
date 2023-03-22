<template>
  <div>
    <a-input :value="value" allowClear v-bind="$attrs" @change="handleChangeIcon">
      <a-icon slot="addonAfter" type="setting" @click="visible = true" />
    </a-input>
    <a-modal
      :visible="visible"
      :footer="null"
      width="40%"
      title="选择图标"
    >
      <div :class="prefixCls">
        <a-tabs v-model="currentTab" @change="handleTabChange">
          <a-tab-pane v-for="v in icons" :key="v.key">
            <span slot="tab" :style="{ fontSize: '10px' }">
              {{ v.title }}
            </span>
            <ul>
              <li
                v-for="(icon, key) in v.icons"
                :key="`${v.key}-${key}`"
                :class="{ 'active': selectedIcon==icon }"
                @click="handleSelectedIcon(icon)"
              >
                <a-icon :type="icon" :style="{ fontSize: '24px' }" />
              </li>
            </ul>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script>
import icons from './icons'

export default {
  name: 'IconSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-icon-selector'
    },
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data() {
    return {
      selectedIcon: this.value || '',
      currentTab: 'directional',
      icons,
      visible: false
    }
  },
  watch: {
    value(val) {
      this.selectedIcon = val
      this.autoSwitchTab()
    }
  },
  created() {
    if (this.value) {
      this.autoSwitchTab()
    }
  },
  methods: {
    handleSelectedIcon(icon) {
      this.selectedIcon = icon
      this.visible = false
      this.$emit('change', icon)
    },
    handleTabChange(activeKey) {
      this.currentTab = activeKey
    },
    autoSwitchTab() {
      // eslint-disable-next-line no-shadow
      const { icons } = this
      // eslint-disable-next-line no-return-assign
      icons.some(item => item.icons.some(icon => icon === this.value) && (this.currentTab = item.key))
    },
    handleChangeIcon(e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>

  ul{
    list-style: none;
    padding: 0;
    overflow-y: scroll;
    height: 250px;

    li{
      display: inline-block;
      padding: 12px;
      margin: 3px 0;
      border-radius: 2px;

      &:hover, &.active{
        // box-shadow: 0px 0px 5px 2px @primary-color;
        cursor: pointer;
        color: white;
        background-color: #1890FF;
      }
    }
  }
</style>
