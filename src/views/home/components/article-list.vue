<template lang="">
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <article-item v-for="(article, index) in list" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 是否加载失败
      refreshSuccessText: '',
      isRefreshLoading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(res)
        const { results } = res.data
        this.list.push(...results)
        // 使loading加载状态结束。
        this.loading = false
        // 判断数据是否加载结束
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不在触发上啦加载更多了
          this.finished = true
        }
      } catch (error) {
        // console.log(error)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
        // this.$toast('加载失败，请重试')
      }
    },
    async onRefresh() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = res.data
        this.list.unshift(...results)
        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false // 关闭下拉刷新的loading 状态
        this.$toast('刷新失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
