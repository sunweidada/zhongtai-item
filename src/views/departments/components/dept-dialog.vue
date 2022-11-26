<template>
  <el-dialog
    :title="`${title}子部门`"
    :visible="isShow"
    width="50%"
    @close="onClose"
  >
    <el-form ref="deptForm" label-width="117px" :model="deptForm" :rules="deptRulers">
      <el-form-item label="部门名称：" prop="name">
        <el-input v-model="deptForm.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="部门编码：" prop="code">
        <el-input v-model="deptForm.code" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人：" prop="manager">
        <el-select
          v-model="deptForm.manager"
          placeholder="请选择负责人"
          @focus="onFocus"
        >
          <el-option v-for="simple in simpleList" :key="simple.id" :label="simple.username" :value="simple.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍：" prop="introduce">
        <el-input v-model="deptForm.introduce" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" @click="onClose">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getSimpleList, getDepartments, addDepartment, getDepartDetail, editDeptment } from '@/api/departments'
export default {
  name: 'DeptDialog',
  props: {
    isShow: Boolean,
    deptId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const checkDeptName = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // const isRepeat = depts.filter(item => item.pid === this.deptId).some(item => item.name === value)
      let isRepeat
      if (this.deptForm.id) {
        isRepeat = depts.filter(item => item.pid === this.deptForm.pid && this.deptForm.id !== depts.id).some(item => item.name === value)
      } else {
        isRepeat = depts.filter(item => item.pid === this.deptId).some(item => item.name === value)
      }
      isRepeat ? callback(`同个部门已经存在${value}名称`) : callback()
    }
    const checkDeptCode = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // const isRepeat = depts.some(item => item.code === value)
      let isRepeat
      if (this.deptForm.id) {
        isRepeat = depts.filter(dept => dept.id !== this.deptForm.id).some(item => item.code === value)
      } else {
        isRepeat = depts.some(item => item.code === value)
      }
      isRepeat ? callback(`公司已经存在${value}编码`) : callback()
    }
    return {
      deptForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      simpleList: [],
      deptRulers: {
        manager: [
          {
            required: true, trigger: 'blur', message: '部门名称不能为空'
          }
        ],
        name: [
          {
            required: true, trigger: 'blur', message: '部门名称不能为空'
          },
          {
            min: 3, max: 10, message: '部门名称必须在3-6个字符之间', trigger: 'blur'
          },
          {
            validator: checkDeptName, trigger: 'blur'
          }
        ],
        code: [
          {
            required: true, trigger: 'blur', message: '编码不能为空'
          },
          {
            min: 3, max: 10, message: '编码必须在3-6个字符之间', trigger: 'blur'
          },
          {
            validator: checkDeptCode, trigger: 'blur'
          }

        ],
        introduce: [
          {
            required: true, trigger: 'blur', message: '介绍不能为空'
          },
          {
            min: 1, max: 100, message: '介绍必须在1-100个字符之间', trigger: 'blur'
          }
        ]

      }
    }
  },
  computed: {
    title() {
      return this.deptForm.id ? '编辑' : '添加'
    }
  },
  methods: {
    async onFocus() {
      this.simpleList = await getSimpleList()
    },
    onClose() {
      this.deptForm = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('on-close')
      this.$refs.deptForm.resetFields()
    },
    async onConfirm() {
      try {
        if (this.deptForm.id) {
          await this.$refs.deptForm.validate()
          await editDeptment(this.deptForm)
        } else {
          await this.$refs.deptForm.validate()
          this.deptForm.pid = this.deptId
          await addDepartment(this.deptForm)
        }
        this.$emit('update-list')
        this.onClose()
        this.$message.success(`${this.deptForm.id ? '编辑' : '添加'}成功`)
      } catch (error) {
        console.log('验证不通过')
      }
    },
    async getDetail(id) {
      this.deptForm = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>
