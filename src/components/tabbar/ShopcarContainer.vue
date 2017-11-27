<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <num-box style="height:25px;" :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></num-box>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计：不含运费</p>
            <p>已勾选
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件， 总价
              <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>元</p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{$store.getters.getGoodsSelected}}</p>

  </div>
</template>

<script>
import NumBox from '@/components/commonComponents/Shopcar_NumBox'

export default {
  data () {
    return {
      goodsList: [] // 购物车所有的商品
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      // 获取所有的id
      let idArr = []
      this.$store.state.car.forEach(item => {
        idArr.push(item.id)
      })
      // 购物车中没有商品，不请求数据
      if (idArr.length <= 0) {
        return
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
        if (result.body.status === 0) {
          // console.log(result.body.message)
          this.goodsList = result.body.message
        }
      })
    },
    /**
     * @param ids 删除 store 中的数据
     * @param idx 删除组件中的数据
     */
    remove (id, idx) {
      this.goodsList.splice(idx, 1)
      this.$store.commit('removeFromCar', id)
    },
    /**
     * 监听switch开关，
     * @param id 商品的id
     * @param status 开关的状态
     */
    selectedChanged (id, status) {
      // console.log(id, status)
      this.$store.commit('updateGoodsSelected', { id: id, selected: status })
    }
  },
  components: {
    NumBox
  }
}
</script>

<style lang="less" scoped>
.red {
  color: #f00;
  font-weight: 400;
  font-size: 16px;
}
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        background-color: #eee;
      }
      h1 {
        font-size: 13px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price {
          color: #f00;
          font-weight: 400;
        }
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left span {
      margin-left: -3px;
    }
  }
}
</style>
