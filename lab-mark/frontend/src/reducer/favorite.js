export const validateFavorite = (favorite) => {
  if(!favorite)
    throw new Error('favorite required')
  let {charity, account, profile} = favorite
  if(!account || !profile || !charity)
    throw new Error('__VALIDATION_ERROR__ invalid favorite')
}

let emptyState = {
  count: 0,
  links: {next: null, prev: null, last: null},
  data: [],
}

export default (state=emptyState, {type, payload}) => {
  switch(type){
    case 'FAVORITE_SET':
      return payload
    case 'FAVORITE_REMOVE':
      state.count--
      state.data = state.data.filter(favorite => favorite._id !== payload._id)
      return state
    case 'FAVORITE_ADD':
      // validateFavorite(payload)
      state.count++
      state.data = [...state.data, payload]
      return state
    case 'TOKEN_REMOVE':
      return emptyState
    default:
      return state
  }
}
