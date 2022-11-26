import request from '@/utils/request'
// 获取员工信息
export const getAllRoleList = params => {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}
// 获取公司信息
export const getCompanyInfo = id => {
  return request({
    method: 'GET',
    url: `/company/${id}`
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 编辑角色
export function editRole(data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

// 获取-角色详情
export const getRoleList = (id) => {
  return request({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

/** *
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

// 分配角色权限
export const allotPerm = data => {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}
