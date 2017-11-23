import Vue from 'vue'
import Router from 'vue-router'

import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photos/PhotolistComponent'
import PhotoInfo from '@/components/photos/PhotoInfoComponent'
import GoodsList from '@/components/goods/GoodsListComponent'
import GoodsInfo from '@/components/goods/GoodsInfoComponent'
import GoodsDesc from '@/components/goods/GoodsDescComponent'
import GoodsComments from '@/components/goods/GoodsCommentsComponent'

Vue.use(Router)

/* eslint-disable no-new */
export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/goodscomment/:id', component: GoodsComments, name: 'goodscomment' }
  ],
  linkActiveClass: 'mui-active' // 把默认的 router-link-active替换成 mui-active
})
