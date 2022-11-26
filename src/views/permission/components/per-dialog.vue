<template>
  <el-dialog :title="title" :visible="isShow" @close="onClose">
    <el-form ref="perFormRef" label-width="120px" :model="perForm" :rules="perFormRules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="perForm.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="perForm.code" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="perForm.description" />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch v-model="perForm.enVisible" active-value="1" inactive-value="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="onConfrim">确定</el-button>
      <el-button size="small" @click="onClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addPermission, updatePermission, getPermissionDetail } from '@/api/permission'
export default {
  name: 'PerDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      perForm: {
        name: '', // 权限表单
        code: '',
        description: '',
        enVisible: '0',
        type: '',
        pid: ''
      },
      perFormRules: {
        name: [
          { trigger: 'blur', required: true, message: '必填' }
        ],
        code: [
          { trigger: 'blur', required: true, message: '必填' }
        ]
      }

    }
  },
  computed: {
    title() {
      return this.perForm.id ? '编辑权限' : '添加权限'
    }
  },
  methods: {
    onClose() {
      this.$refs.perFormRef.resetFields()
      this.$emit('update:isShow', false)
      this.perForm = {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        type: '',
        pid: ''
      }
    },
    async onConfrim() {
      try {
        await this.$refs.perFormRef.validate()
        if (this.perForm.id) {
          await updatePermission(this.perForm)
        } else {
          this.perForm.type = this.type
          this.perForm.pid = this.id
          await addPermission(this.perForm)
        }
        this.$message.success(`${this.perForm.id ? '编辑' : '添加'}权限成功`)
        this.onClose()
        this.$emit('update-list')
      } catch (error) {
        console.log(error)
        this.$message.error('添加权限失败')
      }
    },
    async loadPermissionDetail(id) {
      this.perForm = await getPermissionDetail(id)
    }
  }
}
</script>

<style>

</style>
