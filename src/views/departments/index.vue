<template>
  <div class="dashboard-container">
    <div class="app-container" />
    <el-card class="box-card">
      <tree-tools :tree-node="{name:companyInfo.name, manager:companyInfo.manager}" is-root @add-dept="onAddDept" />

      <el-tree
        v-loading="loading"
        :data="departs"
        props="defaultProps"
        default-expand-all
      >
        <div slot-scope="{data}" style="width:100%;">
          <tree-tools :tree-node="data" @add-dept="onAddDept" @del-dept="onDelDept" @edit-dept="onEditDept" />
        </div>
      </el-tree>

      <!-- 提示框 -->
      <dept-dialog ref="deptDialogRef" :is-show="isShow" :dept-id="deptId" @on-close="onClose" @update-list="loadDeptsList" />
    </el-card>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { list2Tree } from '@/utils/index'
import { getDepartments, delDepartmentById } from '@/api/departments'
import DeptDialog from './components/dept-dialog.vue'
export default {
  name: 'DepartMents',
  components: {
    TreeTools,
    DeptDialog
  },
  data() {
    return {
      companyInfo: {
        name: '',
        manager: '负责人'
      },
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      departs: null,
      isShow: false,
      deptId: '',
      loading: false
    }
  },
  mounted() {
    this.loadDeptsList()
  },
  methods: {
    async loadDeptsList() {
      const res = await getDepartments()
      // console.log(res)
      this.companyInfo.name = res.companyName
      // this.departs.manager = res.companyManage
      this.departs = list2Tree(res.depts, '')
    },
    async onDelDept(deptId) {
      try {
        const result = await this.$confirm('确定要删除嘛')
        if (result === 'confirm') {
          await delDepartmentById(deptId)
          this.loadDeptsList()
        }
      } catch (error) {
        console.log('出错啦')
      }
    },
    onAddDept(deptId) {
      this.deptId = deptId
      this.isShow = true
    },
    onClose() {
      this.isShow = false
    },
    async onEditDept(id) {
      await this.$refs.deptDialogRef.getDetail(id)
      this.isShow = true
    }
  }

}
</script>

<style scoped>
 .box-card{
  padding: 30px 50px;
  margin: 20px;
 }
 .el-tree-node__content{
  width: 100%;
 }
 .el-col{
  margin-bottom: 3px;
 }
</style>
