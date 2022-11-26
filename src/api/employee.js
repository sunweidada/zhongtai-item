import request from '@/utils/request'
export const getEmployeeList = (params) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}

// 删除员工信息
export const delEmployeeById = id => {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}

// // 添加员工
// export const addEmployee = data => {
//   return request({
//     method: 'POST',
//     url: '/sys/user',
//     data
//   })
// }

// 添加员工
export const addEmployee = data => {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}

// 批量添加员工
export const batchEmployee = data => {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}

// 读取用户详情的基础信息
export const getPersonalDetail = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/personalInfo`
  })
}

// 更新用户详情的基础信息
export const updatePersonal = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

// 获取用户的岗位信息
export const getJobDetail = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息
export const updateJob = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

// 保存个人信息
export const saveUserDetailById = data => {
  return request({
    method: 'PUT',
    url: `/employees/${data.id}/personalInfo`,
    data
  })
}

// 获取员工简单列表
export const getEmployeeSimple = () => {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
