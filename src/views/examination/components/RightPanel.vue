<template>
  <div class="right-board">
    <a-tabs v-model="currentTab" class="center-tabs">
      <a-tab-pane key="field" tab="组件属性" />
      <a-tab-pane key="form" tab="表单属性" />
    </a-tabs>
    <div class="field-box">
      <!-- <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a> -->
      <div class="right-scrollbar">
        <!-- 组件属性 -->
        <a-form-model v-show="currentTab==='field' && showField" size="small" label-width="90px">
          <a-form-model-item v-if="activeData.__config__.changeTag" label="组件类型">
            <a-select
              v-model="activeData.__config__.tagIcon"
              placeholder="请选择组件类型"
              :style="{width: '100%'}"
              @change="tagChange"
            >
              <a-select-opt-group v-for="group in tagList" :key="group.label" :label="group.label">
                <a-select-option
                  v-for="item in group.options"
                  :key="item.__config__.label"
                  :value="item.__config__.tagIcon"
                >
<!--                  <svg-icon class="node-icon" :icon-class="item.__config__.tagIcon" />-->
                  <span> {{ item.__config__.label }}</span>
                </a-select-option>
              </a-select-opt-group>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__vModel__!==undefined" label="字段名">
            <a-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.align!==undefined" label="文本对齐方式">
            <a-select v-model='activeData.__config__.align'>
              <a-select-option key="left" value="left">左</a-select-option>
              <a-select-option key="center" value="center">中</a-select-option>
              <a-select-option key="right" value="right">右</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.desc_texts!==undefined" label="文本描述">
            <a-input v-model="activeData.__config__.desc_texts" placeholder="请输入文本描述" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.fontSize!==undefined" label="字体大小">
            <a-input-number v-model="activeData.__config__.fontSize" :step='1' :min='14' placeholder="请输入字体大小" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.color!==undefined" label="文字颜色">
            <colorPicker v-model="activeData.__config__.color" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.componentName!==undefined" label="组件名">
            {{ activeData.__config__.componentName }}
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.label!==undefined" label="标题">
            <a-input v-model="activeData.__config__.label" placeholder="请输入标题" @input="changeRenderKey" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.placeholder!==undefined && activeData.__config__.tag!=='a-range-picker'" label="占位提示">
            <a-input v-model="activeData.placeholder" placeholder="请输入占位提示" @input="changeRenderKey" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__['start-placeholder']!==undefined" label="开始占位">
            <a-input v-model="activeData.__config__['start-placeholder']" @change="changeStartPlaceholder" placeholder="请输入占位提示" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__['end-placeholder']!==undefined" label="结束占位">
            <a-input v-model="activeData.__config__['end-placeholder']" @change="changeEndPlaceholder" placeholder="请输入占位提示" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.span!==undefined" label="表单栅格">
            <a-slider v-model="activeData.__config__.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.layout==='rowFormItem'&&activeData.gutter!==undefined" label="栅格间隔">
            <a-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.layout==='rowFormItem'&&activeData.type!==undefined" label="布局模式">
            <a-radio-group v-model="activeData.type" button-style="solid">
              <a-radio-button value="default">default</a-radio-button>
              <a-radio-button value="flex">flex</a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.justify!==undefined&&activeData.type==='flex'" label="水平排列">
            <a-select v-model="activeData.justify" placeholder="请选择水平排列" :style="{width: '100%'}">
              <a-select-option
                v-for="(item, index) in justifyOptions"
                :key="index"
                :value="item.value"
              >
              {{item.label}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.align!==undefined&&activeData.type==='flex'" label="垂直排列">
            <a-radio-group v-model="activeData.align" button-style="solid">
              <a-radio-button value="top" >top</a-radio-button>
              <a-radio-button value="middle" >middle</a-radio-button>
              <a-radio-button value="bottom" >bottom</a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <template v-if="['a-checkbox-group', 'a-radio-group', 'a-select'].indexOf(activeData.__config__.tag) > -1">
            <a-divider>选项</a-divider>
            <draggable
              :list="activeData.__slot__.options"
              :animation="340"
              group="selectItem"
              handle=".option-drag"
            >
              <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
                <div class="select-line-icon option-drag">
                  <a-icon type="pic-left" />
                </div>
                <a-input v-model="item.label" placeholder="选项名"  />
                <a-input
                  placeholder="选项值"
                  :value="item.value"
                  @input="setOptionValue(item, $event)"
                />
                <div class="close-btn select-line-icon" @click="activeData.__slot__.options.splice(index, 1)">
                  <a-icon type="minus-circle" />
                </div>
              </div>
            </draggable>
            <div >
              <a-button
                style="padding-bottom: 0"
                icon="plus"
                type="link"
                @click="addSelectItem"
              >
                添加选项
              </a-button>
            </div>
            <a-divider>答案选项</a-divider>
            <template v-if="['a-radio-group', 'a-select'].indexOf(activeData.__config__.tag) > -1">
              <a-radio-group
                :options="activeData.__slot__.options"
                v-model='activeData.__config__.result'
              />
            </template>
            <template v-if="['a-checkbox-group'].indexOf(activeData.__config__.tag) > -1">
              <a-checkbox-group
                :options="activeData.__slot__.options"
                v-model='activeData.__config__.result'
              />
            </template>
            <a-divider />
          </template>
          <a-form-model-item v-if="activeData.__config__.score" label="设置分数">
            <a-input-number v-model="activeData.__config__.score" :step='1' :min='1' placeholder="请输入分数" clearable />
          </a-form-model-item>
          <!-- <a-form-model-item v-if="activeData.__config__.labelWidth!==undefined" label="标签宽度">
            <a-input v-model.number="activeData.__config__.labelWidth" type="number" placeholder="请输入标签宽度" />
          </a-form-model-item> -->
          <a-form-model-item v-if="activeData.style&&activeData.style.width!==undefined" label="组件宽度">
            <a-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__vModel__!==undefined" label="默认值">
            <a-input
              :value="setDefaultValue(activeData.__config__.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
            />
          </a-form-model-item>
          <!-- <a-form-model-item v-if="activeData.__config__.tag==='a-checkbox-group'" label="至少应选">
            <a-input-number
              :value="activeData.min"
              :min="0"
              placeholder="至少应选"
              @input="$set(activeData, 'min', $event?$event:undefined)"
            />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag==='a-checkbox-group'" label="最多可选">
            <a-input-number
              :value="activeData.max"
              :min="0"
              placeholder="最多可选"
              @input="$set(activeData, 'max', $event?$event:undefined)"
            />
          </a-form-model-item> -->
          <a-form-model-item v-if="activeData.addonBefore!==undefined" label="前缀">
            <a-input v-model="activeData.addonBefore" placeholder="请输入前缀" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.addonAfter!==undefined" label="后缀">
            <a-input v-model="activeData.addonAfter" placeholder="请输入后缀" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__slot__ && activeData.__slot__['prefix']!==undefined" label="前图标">
            <IconSelect v-model="activeData.__slot__['prefix']" placeholder="请输入前图标名称" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__slot__ && activeData.__slot__['suffix'] !== undefined" label="后图标">
            <IconSelect v-model="activeData.__slot__['suffix']" placeholder="请输入后图标名称" />
          </a-form-model-item>
          <a-form-model-item
            v-if="activeData['icon']!==undefined && activeData.__config__.tag === 'a-button'"
            label="按钮图标"
          >
            <IconSelect v-model="activeData['icon']" placeholder="请输入按钮图标名称" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag === 'a-cascader'" label="选项分隔符">
            <a-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.autoSize !== undefined" label="最小行数">
            <a-input-number v-model="activeData.autoSize.minRows" :min="1" placeholder="最小行数" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.autoSize !== undefined" label="最大行数">
            <a-input-number v-model="activeData.autoSize.maxRows" :min="1" placeholder="最大行数" />
          </a-form-model-item>
          <a-form-model-item v-if="isShowMin" label="最小值">
            <a-input-number v-model.number="activeData.min" placeholder="最小值" />
          </a-form-model-item>
          <a-form-model-item v-if="isShowMax" label="最大值">
            <a-input-number v-if='activeData.__config__.type === "rate"' max='10' v-model.number="activeData.max" placeholder="最大值" />
            <a-input-number v-else v-model.number="activeData.max" placeholder="最大值" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.height!==undefined" label="组件高度">
            <a-input-number v-model="activeData.height" placeholder="高度" @input="changeRenderKey" />
          </a-form-model-item>
          <a-form-model-item v-if="isShowStep" label="步长">
            <a-input-number v-model.number="activeData.step" placeholder="步数" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag === 'a-input-number'" label="精度">
            <a-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.maxLength !== undefined" label="最多输入">
            <a-input v-model.number="activeData.maxLength" placeholder="请输入字符长度">
              <template slot="append">
                个字符
              </template>
            </a-input>
          </a-form-model-item>
          <a-form-model-item v-if="activeData['checkedChildren'] !== undefined" label="开启提示">
            <a-input v-model="activeData['checkedChildren']" placeholder="请输入开启提示" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['unCheckedChildren'] !== undefined" label="关闭提示">
            <a-input v-model="activeData['unCheckedChildren']" placeholder="请输入关闭提示" />
          </a-form-model-item>
          <!-- <a-form-model-item v-if="activeData['active-value'] !== undefined" label="开启值">
            <a-input
              :value="setDefaultValue(activeData['active-value'])"
              placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['inactive-value'] !== undefined" label="关闭值">
            <a-input
              :value="setDefaultValue(activeData['inactive-value'])"
              placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </a-form-model-item> -->
          <a-form-model-item
            v-if="activeData.type !== undefined && 'a-date-picker' === activeData.__config__.tag"
            label="时间类型"
          >
            <a-select
              v-model="activeData.type"
              placeholder="请选择时间类型"
              :style="{ width: '100%' }"
              @change="dateTypeChange"
            >
              <a-select-option
                v-for="(item, index) in dateOptions"
                :key="index"
                :value="item.value"
              >
              {{item.label}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.name !== undefined" label="文件字段名">
            <a-input v-model="activeData.name" placeholder="请输入上传文件字段名" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.accept !== undefined" label="文件类型">
            <a-select
              v-model="activeData.accept"
              placeholder="请选择文件类型"
              :style="{ width: '100%' }"
              clearable
            >
              <a-select-option value="image/*" >图片</a-select-option>
              <a-select-option value="video/*" >视频</a-select-option>
              <a-select-option value="audio/*" >音频</a-select-option>
              <a-select-option value=".xls,.xlsx" >excel</a-select-option>
              <a-select-option value=".doc,.docx" >word</a-select-option>
              <a-select-option value=".pdf" >pdf</a-select-option>
              <a-select-option value=".txt" >txt</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.fileSize !== undefined" label="文件大小">
            <a-input v-model.number="activeData.__config__.fileSize" placeholder="请输入文件大小">
              <a-select slot="append" v-model="activeData.__config__.sizeUnit" :style="{ width: '66px' }">
                <a-select-option value="KB" >KB</a-select-option>
                <a-select-option value="MB" >MB</a-select-option>
                <a-select-option value="GB" >GB</a-select-option>
              </a-select>
            </a-input>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.action !== undefined" label="上传地址">
            <a-input v-model="activeData.action" placeholder="请输入上传地址" clearable />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['list-type'] !== undefined" label="列表类型">
            <a-radio-group v-model="activeData['list-type']" button-style="solid">
              <a-radio-button value="text">
                text
              </a-radio-button>
              <a-radio-button value="picture">
                picture
              </a-radio-button>
              <a-radio-button value="picture-card">
                picture-card
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="activeData.type !== undefined && activeData.__config__.tag === 'a-button'"
            label="按钮类型"
          >
            <a-select v-model="activeData.type" :style="{ width: '100%' }">
              <a-select-option  value="primary" >primary</a-select-option>
              <a-select-option  value="success" >success</a-select-option>
              <a-select-option  value="warning" >warning</a-select-option>
              <a-select-option  value="danger" >danger</a-select-option>
              <a-select-option  value="info" >info</a-select-option>
              <a-select-option  value="text" >text</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            v-if="activeData.__config__.buttonText !== undefined"
            v-show="'picture-card' !== activeData['list-type']"
            label="按钮文字"
          >
            <a-input v-model="activeData.__config__.buttonText" placeholder="请输入按钮文字" />
          </a-form-model-item>
          <a-form-model-item
            v-if="activeData.__config__.tag === 'a-button'"
            label="按钮文字"
          >
            <a-input v-model="activeData.__slot__.default" placeholder="请输入按钮文字" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['range-separator'] !== undefined" label="分隔符">
            <a-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['showToday'] !== undefined" label="今天按钮">
            <a-switch v-model="activeData.showToday" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['showTime'] !== undefined" label="时间选择">
            <a-switch v-model="activeData.showTime" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['inputReadOnly'] !== undefined && activeData.__config__.tag === 'a-date-picker'" label="是否可输入">
            <a-switch v-model="activeData.inputReadOnly" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.format !== undefined" label="时间格式">
            <a-input
              :value="activeData.format"
              placeholder="请输入时间格式"
              @input="setTimeValue($event)"
            />
          </a-form-model-item>


          <template v-if="['a-cascader', 'a-table'].includes(activeData.__config__.tag)">
            <a-divider>选项</a-divider>
            <a-form-model-item v-if="activeData.__config__.dataType" label="数据类型">
              <a-radio-group v-model="activeData.__config__.dataType" button-style="solid">
                <a-radio-button value="dynamic">
                  动态数据
                </a-radio-button>
                <a-radio-button value="static">
                  静态数据
                </a-radio-button>
              </a-radio-group>
            </a-form-model-item>

            <template v-if="activeData.__config__.dataType === 'dynamic'">
              <a-form-model-item label="接口地址">
                <a-input
                  v-model="activeData.__config__.url"
                  :title="activeData.__config__.url"
                  placeholder="请输入接口地址"
                  clearable
                  @blur="$emit('fetch-data', activeData)"
                >
                  <a-select
                    slot="prepend"
                    v-model="activeData.__config__.method"
                    :style="{width: '85px'}"
                    @change="$emit('fetch-data', activeData)"
                  >
                    <a-select-option value="get" >get</a-select-option>
                    <a-select-option value="post" >post</a-select-option>
                    <a-select-option value="put" >put</a-select-option>
                    <a-select-option value="delete" >delete</a-select-option>
                  </a-select>
                </a-input>
              </a-form-model-item>
              <a-form-model-item label="数据位置">
                <a-input
                  v-model="activeData.__config__.dataPath"
                  placeholder="请输入数据位置"
                  @blur="$emit('fetch-data', activeData)"
                />
              </a-form-model-item>

              <template v-if="activeData.fieldNames">
                <a-form-model-item label="标签键名">
                  <a-input v-model="activeData.fieldNames.label" placeholder="请输入标签键名" />
                </a-form-model-item>
                <a-form-model-item label="值键名">
                  <a-input v-model="activeData.fieldNames.value" placeholder="请输入值键名" />
                </a-form-model-item>
                <a-form-model-item label="子级键名">
                  <a-input v-model="activeData.fieldNames.children" placeholder="请输入子级键名" />
                </a-form-model-item>
              </template>
            </template>

            <!-- 级联选择静态树 -->
            <a-tree
              v-if="activeData.options !== undefined"
              :tree-data="activeData.options"
              :replace-fields="{children: 'children', title: 'label', key: 'value'}"
            >
              <template #title="data">
                <a-dropdown :trigger="['contextmenu']">
                  <span>{{ data.label }}</span>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click="append(data.dataRef)">
                        <a-icon type="plus" style="color: #1890ff;" />
                        添加
                      </a-menu-item>
                      <a-menu-item key="2" @click="remove(data)">
                        <a-icon type="delete"
                                theme="twoTone"
                                two-tone-color="#eb2f96"
                        />
                        删除
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
            </a-tree>
            <div v-if="activeData.__config__.dataType === 'static'" style="margin-left: 20px">
              <a-button
                style="padding-bottom: 0"
                icon="plus"
                type="link"
                @click="addTreeItem"
              >
                添加父级
              </a-button>
            </div>
            <a-divider />
          </template>

          <a-form-model-item v-if="activeData.__config__.optionType !== undefined" label="选项样式">
            <a-radio-group v-model="activeData.__config__.optionType" button-style="solid">
              <a-radio-button value="default">
                默认
              </a-radio-button>
              <a-radio-button value="button">
                按钮
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.buttonStyle !== undefined && activeData.__config__.optionType === 'button'" label="风格样式">
            <a-radio-group v-model="activeData.buttonStyle" button-style="solid">
              <a-radio-button value="outline">
                描边
              </a-radio-button>
              <a-radio-button value="solid">
                填充
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签"
          >
            <a-switch v-model="activeData.__config__.showLabel" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.branding !== undefined" label="品牌烙印">
            <a-switch v-model="activeData.branding" @input="changeRenderKey" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['allow-half'] !== undefined" label="允许半选">
            <a-switch v-model="activeData['allow-half']" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['show-text'] !== undefined" label="辅助文字">
            <a-switch v-model="activeData['show-text']" @change="rateTextChange" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['show-score'] !== undefined" label="显示分数">
            <a-switch v-model="activeData['show-score']" @change="rateScoreChange" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['marks'] !== undefined" label="间断点">
            <a-input :value="getMarks(activeData['marks'])" @change="onMarksInput" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.range !== undefined" label="范围选择">
            <a-switch v-model="activeData.range" @change="rangeChange" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.reverse !== undefined" label="反向">
            <a-switch v-model="activeData.reverse" />
          </a-form-model-item>
          <a-form-model-item
            v-if="activeData.__config__.border !== undefined && activeData.__config__.optionType === 'default'"
            label="是否带边框"
          >
            <a-switch v-model="activeData.__config__.border" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.expandTrigger !== undefined" label="任选层级">
            <a-radio-group v-model="activeData.expandTrigger" button-style="solid">
              <a-radio-button value="click">
                click
              </a-radio-button>
              <a-radio-button value="hover">
                hover
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.changeOnSelect !== undefined" label="选择即改变">
            <a-switch v-model="activeData.changeOnSelect" />
          </a-form-model-item>

          <!-- <a-form-model-item v-if="activeData.__config__.tag === 'a-cascader'" label="任选层级">
            <a-switch v-model="activeData.props.props.checkStrictly" />
          </a-form-model-item> -->
          <!-- <a-form-model-item v-if="activeData.__config__.tag === 'a-cascader'" label="是否多选">
            <a-switch v-model="activeData.props.props.multiple" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag === 'a-cascader'" label="展示全路径">
            <a-switch v-model="activeData['show-all-levels']" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag === 'a-cascader'" label="可否筛选">
            <a-switch v-model="activeData.filterable" />
          </a-form-model-item> -->
          <a-form-model-item v-if="activeData.allowClear !== undefined" label="能否清空">
            <a-switch v-model="activeData.allowClear" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.showTip !== undefined" label="显示提示">
            <a-switch v-model="activeData.__config__.showTip" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag === 'a-upload'" label="多选文件">
            <a-switch v-model="activeData.multiple" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData['auto-upload'] !== undefined" label="自动上传">
            <a-switch v-model="activeData['auto-upload']" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.readOnly !== undefined" label="是否只读">
            <a-switch v-model="activeData.readOnly" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.disabled !== undefined" label="是否禁用">
            <a-switch v-model="activeData.disabled" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.showSearch !== undefined" label="能否搜索">
            <a-switch v-model="activeData.showSearch" @change="showSearchChange" />
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.tag === 'a-select'" label="是否多选">
            <!-- <a-switch v-model="activeData.mode" @change="multipleChange" /> -->
            <a-radio-group v-model="activeData.mode" button-style="solid">
              <a-radio-button value="default">
                默认
              </a-radio-button>
              <a-radio-button value="multiple">
                多选
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="activeData.__config__.required !== undefined" label="是否必填">
            <a-switch v-model="activeData.__config__.required" />
          </a-form-model-item>

          <template v-if="activeData.__config__.layoutTree">
            <a-divider>布局结构树</a-divider>
            <a-tree
              :tree-data="[activeData.__config__]"
              :replace-fields="{children: 'children', title: 'componentName', key: 'renderKey'}"
            >
              <template #title="data">
                <a-dropdown :trigger="['contextmenu']">
                  <span>
<!--                    <svg-icon :icon-class="data.__config__?data.__config__.tagIcon:data.tagIcon" />-->
                    {{ data.componentName || data.__config__.componentName
                      || `${data.__config__.label} : ${data.__vModel__}` }}
                  </span>
                </a-dropdown>
              </template>
            </a-tree>
            <!-- <a-tree
              :data="[activeData.__config__]"
              :props="layoutTreeProps"
              node-key="renderKey"
              default-expand-all
              draggable
            >
              <span slot-scope="{ node, data }">
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.__config__?data.__config__.tagIcon:data.tagIcon" />
                  {{ node.label }}
                </span>
              </span>
            </a-tree> -->
          </template>

          <template v-if="Array.isArray(activeData.__config__.regList)">
            <a-divider>正则校验</a-divider>
            <div
              v-for="(item, index) in activeData.__config__.regList"
              :key="index"
              class="reg-item"
            >
              <span class="close-btn" @click="activeData.__config__.regList.splice(index, 1)">
                 <a-icon :style="{ fontSize: '16px' }" type="close-circle" theme="twoTone" two-tone-color="#ff4d4f" />
              </span>
              <a-form-model-item label="表达式">
                <a-input v-model="item.pattern" placeholder="请输入正则" />
              </a-form-model-item>
              <a-form-model-item label="错误提示" style="margin-bottom:0">
                <a-input v-model="item.message" placeholder="请输入错误提示" />
              </a-form-model-item>
            </div>
            <div style="margin-left: 20px">
              <a-button icon="plus-circle" type="link" @click="addReg">
                添加规则
              </a-button>
            </div>
          </template>
        </a-form-model>
        <!-- 表单属性 -->
        <a-form-model v-show="currentTab === 'form'" size="small" label-width="90px">
          <a-form-model-item label="表单名">
            <a-input
              v-model="formConf.formRef"
              placeholder="请输入表单名(ref)`"
            />
          </a-form-model-item>
          <a-form-model-item label="表单模型">
            <a-input v-model="formConf.formModel" placeholder="请输入表单模型" />
          </a-form-model-item>
          <a-form-model-item label="校验模型">
            <a-input v-model="formConf.formRules" placeholder="校验模型" />
          </a-form-model-item>
          <a-form-model-item label="表单布局">
            <a-radio-group v-model="formConf.layout" button-style="solid">
              <a-radio-button value="horizontal">
                水平
              </a-radio-button>
              <a-radio-button value="vertical">
                垂直
              </a-radio-button>
              <a-radio-button value="inline">
                <a-tooltip>
                  <template slot="title">
                    内联样式请点击运行查看
                  </template>
                  内联
                  <a-icon type="exclamation-circle" />
                </a-tooltip>
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="formConf.size !== undefined"
            label="组件尺寸"
          >
            <a-radio-group v-model="formConf.size" button-style="solid">
              <a-radio-button value="large">
                较大
              </a-radio-button>
              <a-radio-button value="default">
                默认
              </a-radio-button>
              <a-radio-button value="small">
                较小
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="formConf.layout === 'horizontal'" label="标签长度">
            <a-input v-model="formConf.labelCol.span" />
          </a-form-model-item>
          <a-form-model-item v-if="formConf.layout === 'horizontal'" label="控件长度">
            <a-input v-model="formConf.wrapperCol.span" />
          </a-form-model-item>
          <a-form-model-item v-if="formConf.layout === 'horizontal'" label="标签偏移量">
            <a-input v-model="formConf.labelCol.offset" />
          </a-form-model-item>
          <a-form-model-item label="标签对齐">
            <a-radio-group v-model="formConf.labelAlign" button-style="solid">
              <a-radio-button value="left">
                左对齐
              </a-radio-button>
              <a-radio-button value="right">
                右对齐
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="栅格间隔">
            <a-input-number v-model="formConf.gutter" :min="0" />
          </a-form-model-item>
          <!-- <a-form-model-item label="禁用表单">
            <a-switch v-model="formConf.disabled" />
          </a-form-model-item> -->
          <a-form-model-item label="表单按钮">
            <a-switch v-model="formConf.formBtns" />
          </a-form-model-item>
          <a-form-model-item label="显示未选中组件边框">
            <a-switch v-model="formConf.unFocusedComponentBorder" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>

    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
  </div>
</template>

<script>
// import { isArray } from 'util'
import TreeNodeDialog from '@/views/examination/components/TreeNodeDialog'
import { isNumberStr } from '@/utils/examination_index'
import IconSelect from './IconSelector'
import {
  inputComponents, selectComponents, layoutComponents
} from '@/views/examination/components/generator/config'
import { saveFormConf } from '@/utils/db'
import draggable from 'vuedraggable'
const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default {
  components: {
    TreeNodeDialog,
    IconSelect,
    draggable
  },
  props: ['showField', 'activeData', 'formConf'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data.__config__
          return data.componentName || `${config.label}: ${data.__vModel__}`
        }
      }
    }
  },
  computed: {
    documentLink() {
      return (
        this.activeData.__config__.document ||
        'https://element.eleme.cn/#/zh-CN/component/installation'
      )
    },
    dateOptions() {
      if (
        this.activeData.type !== undefined &&
        this.activeData.__config__.tag === 'a-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },
    tagList() {
      return [
        {
          label: '输入型组件',
          options: inputComponents
        },
        {
          label: '选择型组件',
          options: selectComponents
        }
      ]
    },
    activeTag() {
      return this.activeData.__config__.tag
    },
    isShowMin() {
      return ['a-input-number', 'a-slider'].indexOf(this.activeTag) > -1
    },
    isShowMax() {
      return ['a-input-number', 'a-slider', 'a-rate'].indexOf(this.activeTag) > -1
    },
    isShowStep() {
      return ['a-input-number', 'a-slider'].indexOf(this.activeTag) > -1
    }
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val)
      },
      deep: true
    }
  },
  methods: {
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      })
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <div class="custom-tree-node">
    //       <span>{node.label}</span>
    //       <span class="node-operation">
    //         <i on-click={() => this.append(data)}
    //           class="el-icon-plus"
    //           title="添加"
    //         ></i>
    //         <i on-click={() => this.remove(node, data)}
    //           class="el-icon-delete"
    //           title="删除"
    //         ></i>
    //       </span>
    //     </div>
    //   )
    // },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { pos } = node
      const dataPos = pos.split('-')
      this.treeRemove(this.activeData.options, 1, dataPos)
    },
    treeRemove(node, index, dataPos) {
      const i = index + 1
      if (index < dataPos.length - 1) {
        this.treeRemove(node[Number(dataPos[index])].children, i, dataPos)
      } else {
        node.splice(Number(dataPos[index]), 1)
      }
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    setOptionValue(item, e) {
      const val = e.target.value
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(e) {
      const str = e.target.value
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onMarksInput(e) {
      const str = e.target.value
      if (str) {
        const list = str.split(',')
        const data = {}
        list.forEach(item => {
          data[item] = item
        })
        this.$set(
          this.activeData,
          'marks',
          data
        )
      } else {
        this.$set(
          this.activeData,
          'marks',
          {}
        )
      }
    },
    getMarks(obj) {
      const list = []
      Object.keys(obj).forEach(key => {
        list.push(key)
      })
      return list.join(',')
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(e) {
      // const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', e.target.value)
      this.$set(this.activeData, 'format', e.target.value)
    },
    spanChange(val) {
      this.formConf.span = val
    },
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange(val) {
      this.$set(
        this.activeData.__config__,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange(val) {
      this.activeData.__config__.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.iconsVisible = false
      this.activeData.__slot__[this.currentIconModel] = val
    },
    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.__config__.tagIcon === tagIcon)
      if (!target) target = selectComponents.find(item => item.__config__.tagIcon === tagIcon)
      this.$emit('tag-change', target)
    },
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.__config__.tag)) {
        this.activeData.__config__.renderKey = +new Date()
      }
    },
    changeStartPlaceholder(val) {
      this.activeData.placeholder[0] = val.target._value
    },
    changeEndPlaceholder(val) {
      this.activeData.placeholder[1] = val.target._value
    },
    showSearchChange(e) {
      if (this.activeData.__config__.tag === 'a-select') {
        this.$set(this.activeData, 'filterOption', (input, option) => (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0))
      }
    }
  }
}
</script>
<style lang="scss">
.center-tabs{
  .ant-tabs-bar{
    margin: 0px;
  }
}
</style>
<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  // padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 114px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 10px 10px 0;
    padding:5px;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label{
  font-size: 14px;
}
.node-icon{
  color: #bebfc3;
}
</style>
