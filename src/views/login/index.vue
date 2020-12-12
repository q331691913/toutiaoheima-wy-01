<template>
  <div class="login-container container">
    <van-nav-bar class="page-nav-bar" title="登陆">
      <van-icon
        v-if="$route.query.redirect"
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        required
        clearable
        name="mobile"
        v-model="user.mobile"
        placeholder="手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="my-shouji toutiao icon-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        type="number"
        required
        placeholder="请输入短信验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="my-shouji toutiao icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="verify-btn"
            size="small"
            type="primary"
            round
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          round
          block
          class="login-btn"
          type="info"
          native-type="submit"
        >
          登陆
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        mobile: '13991111199',
        code: '246810'
      },
      userFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' }],
        code: [{ required: true, message: '验证码不能为空' }]
      },
      time: 1000 * 10,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      const user = this.user
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(user)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功', res)
        // console.log(this.$router)
        // this.$router.push('/my')
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误！')
        } else {
          this.$toast.fail('登陆失败，请稍后重试！')
        }
      }
    },
    async onSendSms() {
      // 1.验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败')
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.verify-btn {
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: 1px solid #ccc;
}
.my-shouji {
  font-size: 37px;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
