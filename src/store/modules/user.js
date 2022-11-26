import { getToken, setToken, removeToken, setTimeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    if (token) {
      setToken(token)
    } else {
      removeToken()
    }
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  }
}

const actions = {
  async userLogin({ commit }, data) {
    try {
      const token = await login(data)
      commit('setToken', token)
      setToken(token)
      setTimeToken()
      console.log(token)
      return true
    } catch (error) {
      console.log(error)
      commit('setToken', null)
      return false
    }
  },
  async asyncGetUserInfo({ commit }) {
    const data = await getUserInfo()
    const baseInfo = await getUserDetailById(data.userId)
    commit('setUserInfo', { ...data, ...baseInfo })
  },
  async logout({ commit }) {
    commit('setToken', null)
    commit('setUserInfo', {})
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
