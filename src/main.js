// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/common/css/index.scss"
import core from "@/core/core.config"
Vue.use(core)
import 'lib-flexible/flexible.js'
import 'font-awesome/css/font-awesome.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
 loading:require('@/assets/laz.jpg')
})
Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))
import "@/common/css/reset.css"
import store from "@/core/store/index"

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
