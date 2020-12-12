<template lang="">
  <div class="my-container">
    <!-- denglu了 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            :src="userInfo.photo"
            width="100"
            height="100"
            class="acatar"
            round
            cover
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-items">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-items">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-items">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-items">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 没登陆 -->
    <div class="header not-login" v-else>
      <div
        class="login-btn"
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登陆 / 注册</span>
      </div>
    </div>

    <!-- 导航栏 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航栏结束 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout() {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确定退出吗'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
          // console.log('确定执行这里')
        })
        .catch(() => {
          console.log('取消执行这里')
        })
    },
    async loadUserInfo() {
      try {
        const { data: res } = await getUserInfo()
        console.log(res)
        this.userInfo = res.data
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>
<style lang="less" scope>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .acatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-items {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
