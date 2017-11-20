<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swiperList" :key="item.url">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu1.png" alt="">
            <div class="mui-media-body">新闻时讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      swiperList: [] // 轮播图
    }
  },
  created () {
    this.getSwiper()
  },
  methods: {
    getSwiper () {
      this.$http.get('api/getLunbo').then(result => {
        console.log(result.body)
        if (result.body.status === 0) {
          this.swiperList = result.body.message
        } else {
          Toast('加载轮播图失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mint-swipe {
  img {
    width: 100%;
    height: 100%;
  }
  height: 200px;
  // .mint-swipe-item {
  //   &:nth-child(1) {
  //     background-color: red;
  //   }
  //   &:nth-child(2) {
  //     background-color: greenyellow;
  //   }
  //   &:nth-child(3) {
  //     background-color: blueviolet;
  //   }
  // }
}
.mui-content {
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    .mui-media {
      background-color: #fff;
      border: none;
      img {
        width: 60px;
        height: 60px;
      }
      .mui-media-body {
        font-size: 14px;
      }
    }
  }
}
</style>
