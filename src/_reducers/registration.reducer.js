import { userConstants } from '../_constants';

export function registration(state = {emailtaken:false}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state,registering: action.status };
    case userConstants.EMAIL_TAKEN:
      return { ...state,emailtaken: action.emailTaken };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registering:false
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        registering:false
      };
    default:
      return state
  }
}