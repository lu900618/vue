<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入您的评论(最多120字)" maxlength="120" v-model="comment"></textarea>
    <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in commentList" :key="index">
        <div class="cmt-title">
          第{{ index+1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{ item.content ? item.content : '此用户很懒, 什么都没留下'}}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      page: 1,
      commentList: [],
      comment: ''
    }
  },
  props: ['id'],
  created () {
    this.getComments()
  },
  methods: {
    getComments () {
      this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.page).then(result => {
        if (result.body.status === 0) {
          // this.commentList = result.body.message
          this.commentList = this.commentList.concat(result.body.message)
        } else {
          Toast('获取评论失败')
        }
      })
    },
    loadMore () {
      this.page++
      this.getComments()
    },
    sendMsg () {
      if (this.comment.trim().length === 0) {
        return Toast('评论内容不能为空')
      }
      this.$http.post('api/postcomment/' + this.id, { content: this.comment.trim() }).then(result => {
        // if result.body.status === 0
        this.commentList.unshift({
          add_time: new Date(),
          content: this.comment.trim(),
          user_name: '匿名用户'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 10px 0;
    .cmt-item {
      .cmt-title {
        background-color: #ccc;
        font-size: 13px;
        line-height: 30px;
      }
      .cmt-body {
        font-size: 13px;
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
