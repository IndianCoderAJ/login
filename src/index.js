import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import './index.css';
import {App} from './App';
import jwt from 'jsonwebtoken'
import {userActions} from './_actions'
// check user authentication here
if (localStorage.getItem('user-auth')) {
  //setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(userActions.setCurrentUser(jwt.decode(localStorage.getItem('user-auth'))))
}

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
   </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
