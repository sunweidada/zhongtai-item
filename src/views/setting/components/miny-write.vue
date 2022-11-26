<template>
  <el-dialog title="添加角色" width="50%" :visible="isVisible" @close="onClosed">
    <el-form ref="roleFormRef" label-width="120px" :model="roleForm" :rules="ruleFormRef">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.description" placeholder="请输入描述信息" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" size="small" @click="onClosed">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'DeptDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      ruleFormRef: {
        name: [
          { required: true, trigger: 'blur', message: '名字不能为空' },
          { min: 2, max: 10, message: '名字在2-10字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onClosed() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$emit('update:isVisible', false)
      this.$refs.roleFormRef.resetFields()
    }
  }
}
</script>

<style>

</style>
