<template>
  <el-dialog title="添加" :visible="isShow" width="40%" @close="onClose">
    <el-checkbox-group v-model="roleIds" v-loading="loading">
      <el-checkbox v-for="item in checkList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button type="info" size="small" @click="onClose">取消</el-button>
      <el-button type="primary" size="small" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { AllotRole, getRoleList } from '@/api/allotrole'
import { getUserDetailById } from '@/api/user'
export default {
  name: 'RoleDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [], // 循环数组
      roleIds: [],
      userId: '',
      pageInfo: {
        page: 1,
        size: 10
      },
      loading: false
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    onClose() {
      this.$emit('update:isShow', false)
    },
    async getRoleList() {
      this.loading = true
      //   const res = await getRoleList(params)
      const res = await getRoleList(this.pageInfo)
      //   console.log(res.rows)
      this.checkList = res.rows
      this.loading = false
    },
    async getUserDetailById(id) {
      const res = await getUserDetailById(id)
      this.userId = id
      this.roleIds = res?.roleIds ?? []
    },
    async onConfirm() {
      try {
        await AllotRole({ id: this.userId, roleIds: this.roleIds })
        console.log(this.roleIds)
        this.$message.success('分配角色成功')
        this.onClose()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
