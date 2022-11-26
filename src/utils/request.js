import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

import { getTimeToken } from '@/utils/auth'

const time = 8 * 60 * 60 * 1000
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // timeout: 5000
})
service.interceptors.request.use(async config => {
  const token = store.getters.token
  if (token) {
    if (expiresTime()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 过期了'))
    }
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
service.interceptors.response.use(res => {
  const { data, message, success } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, async error => {
  if (error?.response?.data?.code === 10002) {
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(new Error('token 过期了'))
  } else {
    Message.error(error.message)
  }

  return Promise.reject(error)
}
)

function expiresTime() {
  const provTime = getTimeToken()
  const currentTime = Date.now()
  return currentTime - provTime > time
}
export default service
