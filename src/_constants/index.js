import { alertActions } from '../_actions';

export * from './alert.constants';
export * from './user.constants';
export * from './forgotpass.constant'
export * from  './loader.constant'

export const clearError = (dispatch) => {
    setTimeout(() => {
        dispatch(alertActions.clear()); 
    }, 2000);
}