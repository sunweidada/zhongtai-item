<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-button type="primary" size="small" @click="addPer(1,'0')">添加权限</el-button>
      </el-card>
      <!-- <PageTools /> -->

      <el-card style="margin-top:10px">
        <el-table
          border
          stripe
          :data="permissionList"
          row-key="id"
          default-expand-all
        >
          <el-table-column label="名称" prop="name" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作" width="300">
            <template v-slot="{row}">
              <el-button v-if="row.type===1" type="primary" icon="el-icon-plus" size="mini" @click="addPer(0,row.id)">添加</el-button>
              <el-button type="success" icon="el-icon-edit" size="mini" @click="editPer(row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="onDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <per-dialog :id="id" ref="perDialogRef" :is-show.sync="isShow" :type="type" @update-list="updateList" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permission'
import { list2Tree } from '@/utils'
import PerDialog from './components/per-dialog.vue'

export default {
  name: 'PermissionPage',
  components: {
    PerDialog
  },
  data() {
    return {
      permissionList: [], //  权限列表
      isShow: false,
      id: '',
      type: 0
    }
  },
  mounted() {
    this.loadPermissionList()
  },
  methods: {
    async loadPermissionList() {
      const res = await getPermissionList()
      this.permissionList = list2Tree(res, '0')
    },
    async onDel(id) {
      try {
        await delPermission(id)
        this.$message.success('删除成功')
        this.loadPermissionList()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    addPer(type, id) {
      this.isShow = true
      this.id = id
      this.type = type
    },
    async editPer(id) {
      await this.$refs.perDialogRef.loadPermissionDetail(id)
      this.isShow = true
    },
    updateList() {
      this.loadPermissionList()
      this.type = 0
      this.id = ''
    }
  }
}
</script>

<style>

</style>
