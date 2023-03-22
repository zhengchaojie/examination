import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
