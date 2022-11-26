<template>
  <el-dialog
    :title="title"
    :visible="isVisible"
    width="50%"
    @close="handleClose"
  >
    <el-form ref="ruleRoleRef" :rules="roleFormRules" label-width="100px" :model="roleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" />
      </el-form-item>
    </el-form>
    <template #footer class="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </template>
  </el-dialog>

</template>

<script>
import { addRole, getRoleList, editRole } from '@/api/setting'
export default {
  name: 'DeptDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // const validName = (rule, value, callback) => {
    //   if (value === this.roleForm.name) {
    //     return callback(new Error('未更改名称'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      roleFormRules: {
        name: [
          { required: true, trigger: 'blur', message: '名字不能为空' },
          { min: 2, max: 30, message: '长度为2-10字符之间', trigger: 'blur' }
        ],
        description: [
          { required: true, trigger: 'blur', message: '消息不能为空' },
          { min: 1, max: 100, message: '内容数量为1-100个字符', trigger: 'blur' }
        ]
      },
      roleForm: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    title() {
      return this.roleForm.id ? '编辑角色' : '添加角色'
    }
  },
  methods: {
    handleClose() {
      this.roleForm = {
        name: '',
        description: ''
      }
      // this.$emit('close-dialog', false)
      this.$emit('update:isVisible', false)
      this.$refs.ruleRoleRef.resetFields()
    },
    async onConfirm() {
      try {
        await this.$refs.ruleRoleRef.validate()
        if (this.roleForm.id) {
          await editRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.$message.success(`${this.roleForm.id ? '编辑' : '添加'}用户信息成功`)
        this.handleClose()
        this.$emit('update-list')
      } catch (error) {
        console.log(error)
        this.$message.success('添加用户信息失败')
      }
    },
    async getRoleList(id) {
      this.roleForm = await getRoleList(id)
    }
  }
}
</script>

<style scoped>
    .footer{
        text-align: center;
    }
</style>

