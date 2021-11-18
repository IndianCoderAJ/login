import { userService } from '../_services';
import { alertActions } from './';
import { clearError, userConstants,loaderConstant, forgotpassConstant } from '../_constants';



function register(user,history) {
    return dispatch => {
        dispatch({type:loaderConstant.LOADINGTRUE}) 
        userService.register(user)
            .then(
                (user) => { 
                    dispatch({type:loaderConstant.LOADINGFALSE}) 
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                    clearError(dispatch);
                    history.push('/login')
                },
              
            ).catch(
                  (error) => {
                    dispatch({type:loaderConstant.LOADINGFALSE}) 
                    if(error.message === 'Network Error'){
                        dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                        clearError(dispatch);
                       return ;
                    }
    
                    dispatch(alertActions.error(error.response.data.error));
                    clearError(dispatch);
                });
        
    }; 
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
}

function getEmailValid(email){
    return dispatch => {
        userService.getEmailValid(email)
            .then(
                (response) => { 
                    dispatch(emailCheck(response.data.emailTaken))
                }
            ).catch(
                  (error) => {
                    if(error.message === 'Network Error'){
                        dispatch(failure("Somthing went wrong please try again in sometime."))
                        dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                        clearError(dispatch);
                       return ;
                    }
                    dispatch(emailCheck(false))
            });
        
    };

    function emailCheck(emailTaken) { return { type: userConstants.EMAIL_TAKEN, emailTaken } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(data,history){
    return dispatch => {
        dispatch({type:loaderConstant.LOADINGTRUE}) 
        userService.login(data)
        .then((response) => {
        dispatch({type:loaderConstant.LOADINGFALSE}) 
        //set token to local storeage.
        localStorage.setItem('user-auth',response.data.accessToken)
        dispatch(setUser(response.data.data))
        history.push('/')
        }).catch((error) => {
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            if(error.message === 'Network Error'){
                dispatch(failure("Somthing went wrong please try again in sometime."))
                dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                clearError(dispatch);
               return ;
            }
            dispatch(alertActions.error(error.response.data.error));
            clearError(dispatch);
        })
    }
    function setUser(data) { return { type: userConstants.SET_USERDATA,data} } 
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout(history){
 return dispatch => {    
    // remove token...
     dispatch(logoutDispatch()) 
     localStorage.removeItem("user-auth");
     history.push('/login')
    
}
  function logoutDispatch(data) { return { type: userConstants.LOGOUT_USER} } 
}

function changePass(data,history){
    return dispatch => {   
        dispatch({type:loaderConstant.LOADINGTRUE}) 
        userService.changePassword(data)
         .then(response => {
            dispatch(alertActions.success(response.data.message));
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            clearError(dispatch);
            history.push('/')
         }).catch((error)=>{
            dispatch({type:loaderConstant.LOADINGFALSE})
            if(error.response && error.response.status === 401){
              dispatch(logoutDispatch()) 
              unauthorized(history);
            } 
            if(error.message === 'Network Error'){
                dispatch(failure("Somthing went wrong please try again in sometime."))
                dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                clearError(dispatch);
               return ;
            }
            dispatch(alertActions.error(error.response.data.error));
            clearError(dispatch);
         })
    }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
    function logoutDispatch(data) { return { type: userConstants.LOGOUT_USER} } 
}

function getOTP (data,history) {
    return dispatch => { 
        dispatch({type:loaderConstant.LOADINGTRUE}) 
        userService.getOPT(data)
        .then(response => {
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            dispatch(alertActions.success(response.data.message));
            data.OTP = response.data.OTP
            dispatch({type:forgotpassConstant.STEP_ONE,data})
            clearError(dispatch);
            history.push('/optVerification')
        }).catch(error => {
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            if(error.message === 'Network Error'){
                dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                clearError(dispatch);
               return ;
            }
            dispatch(alertActions.error(error.response.data.error));
            clearError(dispatch);
        })
    }
}

function otpVerification (data,history) {
    return dispatch => {
        userService.otpVerification(data)
        .then(response => {
            let token = response.data.token
          dispatch({type:forgotpassConstant.STEP_TWO,token})
            history.push('/newpassword')
        }).catch(error => {
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            if(error.message === 'Network Error'){
                dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                clearError(dispatch);
               return ;
            }
            dispatch(alertActions.error(error.response.data.error));
            clearError(dispatch);
        })
    }
}

function resetPassword (data,history){
    return dispatch => {
        dispatch({type:loaderConstant.LOADINGTRUE}) 
        userService.resetPassword(data)
         .then(() => {
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            dispatch({type:forgotpassConstant.CLEAR})
            dispatch(alertActions.success('Password Reset successful.'));
            clearError(dispatch);
            history.push('/')
         }).catch(error => {
            dispatch({type:loaderConstant.LOADINGFALSE}) 
            if(error.message === 'Network Error'){
                dispatch(alertActions.error('Somthing went wrong please try again in sometime.'));
                clearError(dispatch);
               return ;
            }
            // console.log(error.response.status);
            dispatch(alertActions.error(error.response.error));
            clearError(dispatch); 
         })
    }
}

function unauthorized (history) {  
         localStorage.removeItem("user-auth");
         history.push('/login')
         return;
}

function setCurrentUser(data) {
    return { type:userConstants.SET_CURRENTUSER,data}
  }
export const userActions = { 
    register,
    getEmailValid,
    login,
    setCurrentUser,
    logout,
    changePass,
    getOTP,
    otpVerification,
    resetPassword
}