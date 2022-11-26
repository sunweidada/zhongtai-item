<template>
  <el-dialog title="新田员工" :visible="value" @close="onClose">
    <el-form ref="employeeFormRef" :rules="employeeFormRule" label-width="100px" :model="employeeForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="employeeForm.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="employeeForm.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="employeeForm.timeOfEntry"
          type="date"
          placeholder="选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="employeeForm.formOfEmployment">
          <el-option v-for="item in hireType" :key="item.id" :value="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="employeeForm.workNumber" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-cascader
          v-model="deptNames"
          :options="depts"
          placeholder="请选择部门"
          :props="{ label: 'name', value: 'name', checkStrictly: true}"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="employeeForm.correctionTime"
          type="date"
          placeholder="选择转正时间"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" size="small" @click="onConfirm">确定</el-button>
      <el-button type="info" size="small" @click="onClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import HireType from '@/api/constant/employees'
import { addEmployee } from '@/api/employee'
import { getDepartments } from '@/api/departments'
import { list2Tree } from '@/utils/index'
export default {
  name: 'EmployeeDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hireType: HireType.hireType,
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      depts: [], // 部门信息
      deptNames: [],
      employeeFormRule: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 10, message: '用户姓名为1-10位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.loadDepts()
  },
  methods: {
    async loadDepts() {
      const res = await getDepartments()
      this.depts = list2Tree(res.depts, '')
    },
    handleChange(value) {
      console.log(value)
      this.employeeForm.departmentName = value[value.length - 1]
    },
    onClose() {
      this.deptNames = []
      this.$emit('input', false)
      this.$refs.employeeFormRef.resetFields()
    },
    async onConfirm() {
      try {
        await this.$refs.employeeFormRef.validate()
        await addEmployee(this.employeeForm)
        this.$message.success('添加员工成功')
        this.onClose()
        this.$emit('update-list')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-input__inner{
    width: 100%;
}
.el-input .el-input--suffix .el-select-dropdown .el-popper{
    width: 100%;
}
</style>
