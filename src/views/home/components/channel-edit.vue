<template lang="">
  <div class="channel-edit">
    <!-- 频道推荐1 -->
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channelItem, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channelItem, index)"
      >
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channelItem.name
        }}</span>
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channelItem.id)"
          slot="icon"
          name="close"
        />
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐2 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        icon="plus"
        @click="onAddChannel(channel)"
      >
        <div class="text" slot="text">
          {{ channel.name }}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
// const _ = require('lodash')
export default {
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0]
    }
  },
  created() {
    this.loadAllChannels()
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 加载所有频道
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannel()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // 添加新我的频道
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
          this.$toast('添加成功')
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
        // 登陆，把数据请求接口放到线上
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 如果是编辑状态，则执行删除频道
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        try {
          await deleteUserChannel(channel.id)
          this.$toast('删除成功')
        } catch (error) {
          this.$toast('删除失败')
        }
        // 已经登陆，将数据更新到线上
      } else {
        // 没登陆存本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 用所有频道减去我的频道就是频道类型剩余的频道，这里我们用了filter方法和find方法组合
    //  ，如果所有和我的频道里面有不同的id我们就返回他给recom计算属性
    // 也可以用lodash中的diferenceBy方法。因为我们的类比对象是对象 以所有频道取异，
    recommendChannels() {
      // return this.allChannels.filter(
      //   item => !this.myChannels.find(per => item.id === per.id)
      // )
      // return _.differenceBy(this.allChannels, this.myChannels, 'id')
      return this.allChannels.filter(
        item => !this.myChannels.find(per => item.id === per.id)
      )
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
  .grid-item {
    width: 160px;
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        white-space: nowrap;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
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
      .van-grid-item__text,
      .text {
        padding-left: 5px;
        font-size: 28px;
        margin-top: 0;
        white-space: nowrap;
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
