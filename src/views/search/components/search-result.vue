<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        const { data: res } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 搜索关键字
        })
        // 将数据添加到列表中
        const { results } = res.data
        this.list.push(...results)

        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
