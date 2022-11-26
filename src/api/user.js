import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

// 获取用户的基本信息
export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

// 获取员工信息
export const getUserDetailById = userId => {
  return request({
    method: 'GET',
    url: `/sys/user/${userId}`
  })
}

// 修改员工信息
export const saveEmployeeInfo = data => {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}
