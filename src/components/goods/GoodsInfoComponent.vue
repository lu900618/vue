<template>
  <div class="goodsinfo-container">
    <swiper-box :swiperList="swiperList" :isFull="false" class="mui-card" />

    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
      <div class="ball" v-show="ballFlag"></div>
    </transition>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品的标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goods.market_price}}</del>&nbsp;&nbsp; 销售价:
            <span class="now-price">￥{{goods.sell_price}}</span>
          </p>
          <p>购买数量：
            <num-box/>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="add2cart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goods.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goods.goods_no}}</p>
          <p>库存情况：{{goods.stock_quantity}}件</p>
          <p>上架时间：{{goods.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="showDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="showComments(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperComponent from '@/components/commonComponents/SwiperComponent'
import Numberbox from '@/components/commonComponents/GoodsInfo_NumBox'

export default {
  data () {
    return {
      id: this.$route.params.id,
      swiperList: [],
      goods: {},
      ballFlag: false
    }
  },
  created () {
    this.getSwiper()
    this.getGoodsDetail()
  },
  methods: {
    getSwiper () {
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.swiperList = result.body.message
        }
      })
    },
    getGoodsDetail () {
      this.$http.get('api/goods/getinfo/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.goods = result.body.message[0]
        }
      })
    },
    showDesc (id) {
      this.$router.push({
        name: 'goodsdesc',
        params: { id }
      })
    },
    showComments (id) {
      this.$router.push({
        name: 'goodscomment',
        params: { id }
      })
    },
    add2cart () {
      this.ballFlag = !this.ballFlag
    },
     beforeEnter: function (el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter: function (el, done) {
      el.offsetWidth;
      el.style.transform = 'translate(88px, 260px)'
      el.style.transition = 'all 2s cubic-bezier(.48,-0.53,.72,.35)'
      done()
    },
    afterEnter: function (el) {
      this.ballFlag = !this.ballFlag
    }
  },
  components: {
    'swiper-box': SwiperComponent,
    'num-box': Numberbox
  }
}
</script>

<style lang="less">
.goodsinfo-container {
  background: #eee;
  overflow: hidden;

  .now-price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    top: 360px;
    left: 150px;
    z-index: 99;
  }
}
</style>
