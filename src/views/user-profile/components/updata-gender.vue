<template lang="">
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onpickChange"
    />
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdataGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm() {
      try {
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹出层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
        // console.log(res)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onpickChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>
<style lang=""></style>
