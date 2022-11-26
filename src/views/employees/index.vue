<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :is-show-left="true">
        <template #left>
          共{{ total }}条数据
        </template>
        <template #right>
          <el-button size="small" type="danger" @click="onExcel">excel导出</el-button>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="primary" @click="isVisible=true">新增员工</el-button>
        </template>
      </page-tools>

      <el-card class="box-card">
        <el-table border stripe :data="list">
          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column label="姓名" prop="username" align="center" />
          <el-table-column label="头像" prop="staffPhoto" width="120" align="center">
            <template v-slot="{row}">
              <img v-imgerror="baseImg" :src="row.staffPhoto" class="staffPhoto" @click="showQr(row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" width="120" align="center" />
          <el-table-column label="账户状态" prop="enableState" width="120" align="center">
            <template v-slot="{row}">
              <el-switch active-color="pink" :value="row.enableState" />
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" align="center" />
          <!-- <el-table-column label="聘用方式" prop="formOfEmployment" align="center" :formatter="formatEmployees" /> -->
          <el-table-column label="聘用方式" prop="formOfEmployment" align="center">
            <template v-slot="{row}">
              {{ row.formOfEmployment|formatEmployees }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" width="100" align="center">
            <template v-slot="{row}">
              {{ row.timeOfEntry|formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="290" align="center">
            <template v-slot="{row}">
              <el-button type="text" @click="$router.push($router.push(`/employees/detail/${row.id}`))">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="AllotRole(row.id)">角色</el-button>
              <el-button type="text" @click="onDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="pageInfo.page"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <employee-dialog v-model="isVisible" @update-list="loadList" />
      </el-card>

      <el-dialog title="二维码" width="30%" :visible="isShowQr" @close="onCloseQr">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>

      <!-- <RoleDialog ref="roleDialogRef" :is-show.sync="isShowAllot" /> -->
      <RoleDialog v-if="isShowAllot" ref="roleDialogRef" :is-show.sync="isShowAllot" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployeeById } from '@/api/employee'
import employees from '@/api/constant/employees'
import avator from '@/assets/common/bigUserHeader.png'
import EmployeeDialog from './components/employee-Dialog.vue'
import QrCode from 'qrcode'
import RoleDialog from '@/views/employees/components/role-dialog.vue'

export default {
  name: 'EmployeesPage',
  components: {
    EmployeeDialog,
    RoleDialog
  },
  data() {
    return {
      isShowQr: false,
      isShowAllot: false,
      pageInfo: {
        page: 1,
        size: 10
      },
      total: 0,
      list: [],
      hireType: employees.hireType,
      baseImg: avator,
      isVisible: false

    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    onCloseQr() {
      this.isShowQr = false
    },
    handleSizeChange(newSize) {
      this.pageInfo.size = newSize
      this.loadList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.pageInfo.page = newPage
      this.loadList()
    },
    async loadList() {
      const { rows, total } = await getEmployeeList(this.pageInfo)
      rows.forEach(item => {
        item['enableState'] = true
      })
      this.list = rows
      this.total = total
    },
    // formatEmployees(row, column, cellValue, index) {
    //   const hire = this.hireType.find(item => item.id === +cellValue)
    //   return hire ? hire['value'] : '未知'
    // }
    async onDel(id) {
      try {
        const res = await this.$confirm('你确定要删除该员工嘛')
        if (res === 'confirm') {
          await delEmployeeById(id)
          this.$message.success('删除成功')
          if (this.list.length === 1) {
            this.pageInfo.page = this.pageInfo.page >= 2 ? this.pageInfo.page - 1 : 1
          }
          this.loadList()
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    onExcel() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.total })
        const data = this.formatData(rows, headers)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: data,
          filename: 'excel-list',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatData(list, header) {
      return list.map(item => {
        return Object.values(header).map(key => {
          if (key === 'timeOfEntry' || key === 'correctionTime') {
            return this.formatDate(item[key])
          } else if (key === 'formOfEmployment') {
            const person = this.hireType.find(x => x.id === +item[key])
            return person?.value ?? '未知'
          } else {
            return item[key]
          }
        })
      })
    },
    formatDate(time) {
      const date = new Date(time)
      const year = date.getFullYear() + 1
      const mouth = (date.getMonth() + '').padStart(2, '0')
      const day = (date.getDate() + '').padStart(2, '0')
      return `${year}-${mouth}-${day}`
    },
    showQr(url) {
      // console.log(url);
      if (url) {
        console.log(url)
        this.isShowQr = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('请更新头像')
      }
    },
    // async AllotRole(id) {
    AllotRole(id) {
      this.isShowAllot = true
      // await this.$refs.roleDialogRef.getRoleList({ page: 1, pagesize: this.total })
      // await this.$refs.roleDialogRef.getUserDetailById(id)
      this.$nextTick(async() => {
        await this.$refs.roleDialogRef.getUserDetailById(id)
      })
    }

  }

}
</script>

<style scoped>
.box-card{
  margin-top: 20px;
}
.el-pagination{
  margin-top: 20px;
  text-align: center;
}
.staffPhoto{
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
canvas{
  display: flex;
  justify-items: center;
  align-items: center;

}
</style>
