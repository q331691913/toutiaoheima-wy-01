<template>
  <div id="app">
    <!-- // 只想缓存列表 ，  不想缓存详情 -->
    <keep-alive :include='cachPages'>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachPages'])
  }
}
</script>

<style lang="less"></style>
