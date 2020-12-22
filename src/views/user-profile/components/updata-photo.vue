<template lang="">
  <div class="updata-photo">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdataPhoto',
  data() {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 裁剪框限制在画布当中
      dragMode: 'move', // 不允许直接选择裁剪框的大小，只能移动
      aspectRatio: 1, // 截图框的比例
      autoCropArea: 1, // 自动截取的比例，一边丁满
      cropBoxMovable: false, // 只能是背后的画布移动
      cropBoxResizable: false, // 截图区域不允许缩放大小
      background: false // 关闭自带背景
    })
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取
      // console.log(this.cropper.getData())

      // 基于纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhotos(blob)
      })
    },
    async updateUserPhotos(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data: res } = await updateUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('updata-photo', res.data.photo)
        this.$toast('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>
<style lang="less">
.updata-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
