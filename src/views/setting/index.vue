<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleTabToggle">
      <el-tab-pane label="角色管理" name="first">
        <el-button type="primary" size="small" class="addRoles" @click="isVisible=true">新增角色</el-button>
        <el-table
          style="width: 100%"
          border
          stripe
          :data="roleList"
        >
          <el-table-column
            prop="date"
            label="序号"
            width="80"
            type="index"
          />
          <el-table-column
            prop="name"
            label="角色"
            width="180"
          />
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            label="操作"
            width="290"
          >
            <template v-slot="{row}">
              <!-- <pre>{{row}}</pre> -->
              <el-button type="primary" icon="el-icon-setting" size="small" @click="onAllotRole(row.id)">分配权限</el-button>
              <el-button type="primary" icon="el-icon-edit" size="small" @click="onEditRole(row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="onDelRole(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfo.page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <dept-dialog ref="dialogRef" :is-visible.sync="isVisible" @update-list="loadList" />
      </el-tab-pane>
      <!-- <MineWrite :is-visible.sync="isVisible" /> -->
      <el-tab-pane label="公司信息" name="company">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          center
          show-icon
          :closable="false"
        />
        <el-form label-width="100px">
          <el-form-item label="公司名称">
            <el-input v-model="companInfo.name" disabled />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="companInfo.companyAddress" disabled />
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="companInfo.mailbox" disabled />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="companInfo.remarks" class="remark" type="textarea" disabled />
          </el-form-item>

        </el-form>
      </el-tab-pane>
    </el-tabs>
    <AllotDialog ref="allotDialogRef" :is-show-allot.sync="isShowAllot" />
  </el-card>
</template>
<script>
import { getAllRoleList, getCompanyInfo, deleteRole } from '@/api/setting'
// import MineWrite from './components/miny-write.vue'
import { mapGetters } from 'vuex'
import DeptDialog from './components/dept-dialog.vue'
import AllotDialog from './components/allot-dialog.vue'

export default {
  name: 'SettingPage',
  components: {
    DeptDialog,
    AllotDialog
    // MineWrite
  },
  data() {
    return {
      isVisible: false,
      isShowAllot: false,
      activeName: 'first',
      pageInfo: {
        page: 1,
        pagesize: 5
      },
      total: 10,
      roleList: [],
      companInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.loadList()
  },
  methods: {
    async loadList() {
      const { rows, total } = await getAllRoleList(this.pageInfo)
      // console.log(rows, total)
      this.roleList = rows
      this.total = total
    },
    handleSizeChange(newSize) {
      console.log('newSize', newSize)
      this.pageInfo.pagesize = newSize
      this.loadList()
    },
    handleCurrentChange(newPage) {
      console.log('newPage', newPage)
      this.pageInfo.page = newPage
      this.loadList()
    },
    handleTabToggle() {
      // console.log(11)
      if (this.activeName === 'company') {
        this.loadCompanyInfo()
      }
    },
    async loadCompanyInfo() {
      this.companInfo = await getCompanyInfo(this.companyId)
      // console.log(this.companInfo)
    },
    async onDelRole(roleId) {
      // await this.$confirm('您确认要删除该角色嘛？')
      try {
        await this.$confirm('您确认要删除该角色嘛？')
        await deleteRole(roleId)
        this.$message.success('删除角色成功')
        if (this.roleList.length === 1) {
          this.pageInfo.page = this.pageInfo.page >= 2 ? this.pageInfo.page - 1 : 1
        }
        this.loadList()
      } catch (error) {
        this.$message.info('你取消了删除')
      }
    },
    async onEditRole(row) {
      this.$refs.dialogRef.getRoleList(row.id)
      this.isVisible = true
    },
    onAllotRole(userId) {
      this.isShowAllot = true
      this.$refs.allotDialogRef.loadRoleList(userId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card{
    margin: 20px;
  }
  .el-form{
    .el-form-item{
      .el-input{
        width: 500px;
      }
    }
  }
  .remark{
    width: 500px;
  }
  .el-alert,
  .el-tab-pane{
    margin-bottom: 20px;
  }
  .addRoles{
    margin-bottom: 20px;
  }
  .el-tab-pane{
    margin-bottom: 20px;
  }
  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }
</style>
