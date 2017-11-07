export const validateCharity = (charities) => {
  let {firstName, lastName} = charities
  if(!firstName || !lastName)
    throw new Error('__VALIDATION_ERROR__ invalid charity')
}

let emptyState = {
  data: [],
}

export default (state=emptyState, {type, payload}) => {
  switch(type){
    case 'CHARITIES_SET':
      // validateCharity(payload)
      return payload
    case 'TOKEN_REMOVE':
      return emptyState
    default:
      return state
  }
}
