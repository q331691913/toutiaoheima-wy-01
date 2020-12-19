<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        class="search"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#2893F9"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :SearchHistories="SearchHistories"
      @clear-search-histories="SearchHistories = []"
      @search="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem } from '@/utils/storage'
import { getItem } from '@/utils/storage'

export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [],
      isResultShow: false,
      searchText: ''
    }
  },
  computed: {},
  watch: {
    SearchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created() {},
  methods: {
    onSearch(val) {
      this.searchText = val
      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$toast('取消')
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
  .search {
    padding-top: 106px;
    .van-search {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
