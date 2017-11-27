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
    addToCart (state, goodsinfo) {
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
    },
    updateGoodsInfo (state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar (state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    /**
     * 更新购物车选中的信息
     * @param {*} state 
     * @param {Object} info 
     */
    updateGoodsSelected (state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount (state) {
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount (state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    /**
     * 获取购物车左侧按钮对应的状态对象 {id:true}
     */
    getGoodsSelected (state) {
      let obj = {}
      state.car.forEach(item => {
        obj[item.id] = item.selected
      })
      return obj
    },
    /**
     * 获取商品总的数量和价格
     * @param {*} state 
     */
    getGoodsCountAndAmount (state) {
      let obj = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        obj.count += item.count
        obj.amount += item.price * item.count
      })
      return obj
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
