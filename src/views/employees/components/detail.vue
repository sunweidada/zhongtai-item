<template>
  <el-card>
    <el-tabs>
      <el-tab-pane label="登陆账号设置">
        <el-form ref="formDataRef" :model="formData" label-width="110px" :rules="formDataRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="psd">
            <el-input v-model="formData.psd" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="saveUserInfo">更新</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人详情">
        <component :is="UserInfo" />
      </el-tab-pane>
      <el-tab-pane label="岗位信息">
        <JobInfo />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getUserDetailById, saveEmployeeInfo } from '@/api/user'
import UserInfo from './user-info.vue'
import JobInfo from './job-info.vue'
export default {
  name: 'DetailPage',
  components: {
    UserInfo,
    JobInfo
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      UserInfo,
      formData: {
        username: '',
        psd: ''
      },
      formDataRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 2, max: 8, trigger: 'blur', message: '用户名在2-5字符之间' }
        ],
        psd: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 5, max: 15, trigger: 'blur', message: '密码在5-15字符之间' }
        ]
      }
    }
  },
  mounted() {
    this.loadDetail()
  },
  methods: {
    async loadDetail() {
      try {
        this.formData = await getUserDetailById(this.userId)
      } catch (error) {
        console.log(error)
      }
    },
    async saveUserInfo() {
      try {
        await this.$refs.formDataRef.validate()
        const newObj = Object.assign({}, this.formData, { password: this.formData.psd })
        await saveEmployeeInfo(newObj)
        this.$message.success('更新成功')
        this.loadDetail()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
