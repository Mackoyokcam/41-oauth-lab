import superagent from 'superagent'

export const set = (favorites) => ({
  type: 'FAVORITE_SET',
  payload: favorites,
})

export const remove = (favorite) => ({
  type: 'FAVORITE_REMOVE',
  payload: favorite,
})

export const add = (favorite) => ({
  type: 'FAVORITE_ADD',
  payload: favorite,
})


export const create = (favorite) => (store) => {
  let {token} = store.getState()
  return superagent.post(`${__API_URL__}/favorites`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({charity: favorite})
    .then(res => {
      return superagent.get(`${__API_URL__}/favorites/${res.body._id}`)
        .set('Authorization', `Bearer ${token}`)
    })
    .then(res => {
      return store.dispatch(add(res.body))
    })
}

export const unfavorite = (favorite) => (store) => {
  let {token} = store.getState()
  return superagent.delete(`${__API_URL__}/favorites/${favorite._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then(res => {
      return store.dispatch(remove(favorite))
    })
}

export const fetch = () => (store) => {
  let {token} = store.getState()
  return superagent.get(`${__API_URL__}/favorites`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}
