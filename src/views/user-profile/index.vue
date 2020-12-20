<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdataNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="UpdataGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdataBirthdayShow = true"
    />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdataNameShow" style="height:100%" position="bottom">
      <updata-name
        v-if="isUpdataNameShow"
        @close="isUpdataNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 性别选择 -->
    <van-popup v-model="UpdataGenderShow" position="bottom">
      <updata-gender
        v-if="UpdataGenderShow"
        v-model="user.gender"
        @close="UpdataGenderShow = false"
      />
    </van-popup>
    <!-- 生日修改编辑 -->
    <van-popup v-model="isUpdataBirthdayShow" position="bottom">
      <updata-birthday
        v-if="isUpdataBirthdayShow"
        v-model="user.birthday"
        @close="isUpdataBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdataPhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <updata-photo :img="img" @close="isUpdataPhotoShow = false" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdataName from './components/updata-name'
import UpdataGender from './components/updata-gender'
import UpdataBirthday from './components/updata-birthday'
import UpdataPhoto from './components/updata-photo'

export default {
  name: 'UserProfile',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataPhoto
  },
  data() {
    return {
      user: {}, // 个人信息
      isUpdataNameShow: false,
      UpdataGenderShow: false,
      isUpdataBirthdayShow: false,
      isUpdataPhotoShow: false,
      img: null
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 改变
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取 blod数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片弹出层
      this.isUpdataPhotoShow = true
      // 选择同一个不会触发change事件 把value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
