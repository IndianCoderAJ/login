import { forgotpassConstant } from "../_constants";

export function forgotpass(state = {}, action) {
  switch (action.type) {
    case forgotpassConstant.STEP_ONE:
      return {
        email:action.data.email,
        OTP:action.data.OTP
      };
    case forgotpassConstant.STEP_TWO:
      return {
        ...state,
        token:action.token
      };
    case forgotpassConstant.CLEAR:
      return {};
    default:
      return state
  }
}