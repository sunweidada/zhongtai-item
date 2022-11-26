import request from '@/utils/request'
export function getDepartments() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}

export const delDepartmentById = (id) => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

// 获取员工简单列表
export const getSimpleList = () => {
  return request({
    url: '/sys/user/simple'
  })
}

export const addDepartment = (data) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}

// 编辑
export const getDepartDetail = (id) => {
  return request({
    method: 'GET',
    url: `/company/department/${id}`
  })
}
//  修改
export const editDeptment = (data) => {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
