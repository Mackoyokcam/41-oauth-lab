import superagent from 'superagent'

export const queryParser = (query) => {
  let result = {}

  for (let key in query) {
    if(query[key] !== '')
      result[key] = query[key]
  }

  return result
}

export const set = (charities) => ({
  type: 'CHARITIES_SET',
  payload: charities,
})

export const search = (query) => (store) => {
  let {token} = store.getState()
  let parsedQuery = queryParser(query)
  return superagent.get(`${__API_URL__}/charities`)
    .set('Authorization', `Bearer ${token}`)
    .query(parsedQuery)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}

export const changePage = (url) => (store) => {
  let {token} = store.getState()
  return superagent.get(url)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}
