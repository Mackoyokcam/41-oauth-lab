// export const validateCharity = (charities) => {
//   let {firstName, lastName} = charities
//   if(!firstName || !lastName)
//     throw new Error('__VALIDATION_ERROR__ invalid charity')
// }

let emptyState = {
  count: 0,
  links: {next: null, prev: null, last: null},
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
