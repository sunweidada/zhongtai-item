import request from '@/utils/request'
export const getRoleList = params => {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}
// 分配权限 -角色
export const AllotRole = data => {
  return request({
    method: 'PUT',
    url: `/sys/user/assignRoles`,
    data
  })
}
