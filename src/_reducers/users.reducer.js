import { userConstants } from '../_constants';

export function users(state = {loggingIn:false}, action) {
  switch (action.type) {
    case userConstants.SET_USERDATA:
      return {  
        ...action.data,
        loggingIn:true
       };
    case userConstants.SET_CURRENTUSER:
      return {
        ...action.data,
        loggingIn:true
      } 
    case userConstants.LOGOUT_USER:
      return {
        loggingIn:false
      }  
    default:
      return{ ...state }
  }
}