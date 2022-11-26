<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ username }}</div>
    <PageTools :is-show-left="isShowLeft">
      <template v-slot:left>
        显示有100条数据
      </template>
      <template v-slot:right>
        <el-button type="primary" size="small">按钮</el-button>
      </template>
    </PageTools>
    <PageTools />
    <ImageUpload />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PageTools from '@/components/PageTools'

export default {
  name: 'Dashboard',
  // components: {
  //   PageTools
  // },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  data() {
    return {
      isShowLeft: true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
