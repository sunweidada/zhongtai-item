<template>
  <el-row type="flex" justify="space-between">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="6" style="width:200px;">
      <el-row type="flex" justify="space-between">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'add':
          this.$emit('add-dept', this.treeNode.id)
          break

        case 'edit':
          this.$emit('edit-dept', this.treeNode.id)
          break

        case 'delete':
          this.$emit('del-dept', this.treeNode.id)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
