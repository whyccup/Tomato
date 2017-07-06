import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// 引入电子外部样式
import './assets/css/photon.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
