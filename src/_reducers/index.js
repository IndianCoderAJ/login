import { combineReducers } from 'redux';

// import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { loading } from './loader.reducer';
import { forgotpass } from './forgotpass.reducer';


const rootReducer = combineReducers({
//   authentication,
  registration,
  users,
  alert,
  loading,
  forgotpass
});

export default rootReducer;