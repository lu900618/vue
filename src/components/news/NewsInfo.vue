<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ news.title }}</h3>
    <p class="subtitle">
      <span>发表时间: {{ news.add_time | dateFormat}}</span>
      <span>点击: {{ news.click }}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="news.content">
    </div>
    <!-- 评论区域 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import CommentComponent from '@/components/commonComponents/commentComponent'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      id: this.$route.params.id,
      news: {}
    }
  },
  created () {
    // console.log(this.$route)
    this.getNewsById()
  },
  methods: {
    getNewsById () {
      this.$http.get('api/getnew/' + this.id).then(result => {
        console.log(result.body)
        if (result.body.status === 0) {
          this.news = result.body.message[0]
        } else {
          Toast('获取新闻失败')
        }
      })
    }
  },
  components: {
    'comment-box': CommentComponent
  }
}
</script>

<style lang="less">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 14px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>

