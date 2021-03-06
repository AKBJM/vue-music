// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

/* eslint-disable no-unused-vars */
import Vconsole from 'vconsole'

import 'common/stylus/index.styl'

/* eslint-disable no-new  移动端点击没有300ms的延迟 */
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
