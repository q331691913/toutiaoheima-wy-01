<template lang="">
  <div class="channel-edit">
    <!-- 频道推荐1 -->
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini"
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channelItem, index) in myChannels"
        :key="index"
        :text="channelItem.name"
        icon="close"
      />
    </van-grid>
    <!-- 频道推荐2 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="value in 8"
        :key="value"
        icon="plus"
        text="文字"
      />
    </van-grid>
  </div>
</template>
<script>
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item_content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #2222;
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
  /deep/ .van-icon-close {
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 36px;
    color: #ccc;
  }
}
</style>
