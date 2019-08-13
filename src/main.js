// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// import 'style/index.less'
import '../lib/font-awesome-4.7.0/css/font-awesome.min.css'
import '../lib/my-element-ui/theme/index.css'
/* eslint-disable no-new */
import Axios from 'axios'
Vue.prototype.$axios = Axios

import '!style-loader!css-loader!less-loader!./style/index.less'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
