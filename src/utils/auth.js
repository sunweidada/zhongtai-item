import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-51'
const TimeKey = 'hrsaas-51-time-key'

export function getTimeToken() {
  return Cookies.get(TimeKey)
}

export function setTimeToken() {
  Cookies.set(TimeKey, +new Date())
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
