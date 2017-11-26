import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import moment from 'moment'
import Preview from 'vue-preview'
import Vuex from 'vuex'

// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

// 配置 .babelrc mint-ui 插件
// import '../node_modules/mint-ui/lib/header/style.css'

Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(Preview)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /** { id:id, count:123, price:123, selected:true//默认是否选中} */
    car: JSON.parse(localStorage.getItem('car')) || [] // 存取购物车中的数据
  },
  mutations: {
    addToCart(state, goodsinfo) {
      let flag = false // 默认购物车中没有相同的商品
      // 1.购物车中已经有， 更新数量
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 2.没有，添加
      if (!flag) {
        state.car.push(goodsinfo)
      }

      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    }
  }
})

// Vue.use(Lazyload)
Vue.http.options.root = 'http://vue.studyit.io/'
Vue.http.options.emulateJSON = true

// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.config.productionTip = false

/* 定义全局的过滤器  事件格式化 */
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
