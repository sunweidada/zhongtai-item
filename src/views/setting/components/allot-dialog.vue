<template>
  <el-dialog title="分配权限" :visible="isShowAllot" @close="onClose">

    <!-- 分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点。需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。 -->
    <el-tree
      ref="treeRef"
      :data="permList"
      :props="defaultProps"
      default-expand-all
      show-checkbox
      node-key="id"
      check-strictly
    />

    <template #footer>
      <el-button type="primary" size="samll" @click="onConfirm">确定</el-button>
      <el-button size="samll" @click="onClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { list2Tree } from '@/utils/index'
import { getRoleList, allotPerm } from '@/api/setting'

export default {
  name: 'AllotDialog',
  props: {
    isShowAllot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId: ''
    }
  },
  mounted() {
    this.loadPermList()
  },
  methods: {
    onClose() {
      this.$emit('update:isShowAllot', false)
    },
    async loadPermList() {
      const res = await getPermissionList()
      //   console.log(res)
      this.permList = list2Tree(res, '0')
    },
    async loadRoleList(id) {
      const { permIds } = await getRoleList(id)
      this.roleId = id
      //   console.log(res)
      this.$refs.treeRef.setCheckedKeys(permIds)
    },
    async onConfirm() {
      const inputParams = {
        id: this.roleId,
        permIds: this.$refs.treeRef.getCheckedKeys()
      }
      try {
        await allotPerm(inputParams)
        this.$message.success('分配权限成功')
        this.onClose()
      } catch (error) {
        this.$message.error('分配角色权限失败')
      }
    }
  }
}
</script>

<style>

</style>
