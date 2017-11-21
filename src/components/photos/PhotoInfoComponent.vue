<template>
  <div class="photoinfo-container">
    <h3>{{photo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photo.add_time | dateFormat}}</span>
      <span>点击：{{photo.click}}次</span>
    </p>
    <hr>

    <div class="thumbs">
      <img v-for="(item, i) in list" :key="item.src" height="100" :src="item.src" alt="" class="preview-img" @click="$preview.open(i,list)">
    </div>

    <div class="content" v-html="photo.content"></div>

    <cmt-box id="id"></cmt-box>
  </div>
</template>

<script>
import CommentComponent from '@/components/commonComponents/commentComponent'

export default {
  data () {
    return {
      id: this.$route.params.id,
      photo: {},
      list: []
    }
  },
  created () {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo () {
      this.$http.get(`api/getimageInfo/${this.id}`).then(result => {
        if (result.body.status === 0) {
          this.photo = result.body.message[0]
        }
      })
    },
    getThumbs () {
      this.$http.get(`api/getthumimages/${this.id}`).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600
            item.h = 400
          })
          this.list = result.body.message
        }
      })
    }
  },
  components: {
    'cmt-box': CommentComponent
  }
}
</script>

<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
