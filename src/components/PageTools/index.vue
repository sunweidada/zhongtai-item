<template>
  <el-card>
    <el-row type="flex">
      <el-col v-if="isShowLeft" :span="12">
        <i class="el-icon-info" />
        <slot name="left">左侧区域</slot>
      </el-col>
      <el-col :span="!isShowLeft ? 24:12">
        <el-row type="flex" justify="end">
          <slot name="right">右侧区域</slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    isShowLeft: {
      type: Boolean,
      default: false // 默认不显示左侧区域
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
