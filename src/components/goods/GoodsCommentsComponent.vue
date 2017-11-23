<template>
  <div>
    <cmt-box :id="this.$route.params.id"></cmt-box>
  </div>
</template>

<script>
import CommentComponent from '@/components/commonComponents/commentComponent'

export default {
  components: {
    'cmt-box': CommentComponent
  }
}
</script>

<style lang="less" scoped>

</style>
