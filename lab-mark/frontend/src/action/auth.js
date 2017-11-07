import superagent from 'superagent'
import {cookieDelete} from '../lib/util.js'

// sync
export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
})

// async
export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/auth`)
    .send(user)
    .withCredentials()
    .then(res => {
      return store.dispatch(tokenSet(JSON.parse(res.text).token))
    })
}

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/auth`)
    .auth(user.username, user.password)
    .withCredentials()
    .then(res => {
      return store.dispatch(tokenSet(JSON.parse(res.text).token))
    })
}

export const logout = () => {
  cookieDelete('X-Charity-Token')
  return tokenRemove()
}
