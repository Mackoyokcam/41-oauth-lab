import * as util from '../lib/util.js'
import {rehydrateCookie} from '../lib/redux-persist.js'

let intialState = rehydrateCookie('X-Charity-Token', null)

export default (state=intialState, {type, payload}) => {
  switch(type){
    case 'TOKEN_SET':
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state
  }
}
