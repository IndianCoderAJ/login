import { loaderConstant } from '../_constants';

export function loading(state =false, action) {
  switch (action.type) {
    case loaderConstant.LOADINGTRUE:
      return true
    case loaderConstant.LOADINGFALSE:
        return false  
    default:
      return state
  }
}