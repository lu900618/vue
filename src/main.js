import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import moment from 'moment'

import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

// 配置 .babelrc mint-ui 插件
// import '../node_modules/mint-ui/lib/header/style.css'

Vue.use(VueResource)
Vue.http.options.root = 'http://vue.studyit.io/'
Vue.http.options.emulateJSON = true

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
// Vue.config.productionTip = false

/* 定义全局的过滤器  事件格式化 */
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
