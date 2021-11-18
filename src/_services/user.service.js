import axios from 'axios';
import { hostname } from '../config/config';
import { headers } from '../_helpers';




let register = (user) => {
    return axios.post(`${hostname}/user/signup`,user)
}


let getEmailValid = (email) => {
    return axios.post(`${hostname}/user/emailCheck`,{email:email})
}

let login = (data) => {
    return axios.post(`${hostname}/user/login`,data)
}

let changePassword = (data) => {
    return axios.put(`${hostname}/user/password`,data,{
        headers:headers()
    })
}

let getOPT = (data) => {
    return axios.post(`${hostname}/user/password/forgot`,data)
}


let otpVerification = (data) => {
    return axios.post(`${hostname}/user/password/forgot/verifyotp`,data)
}

let resetPassword = (data) => {
    return axios.post(`${hostname}/user/password/forgot/reset`,data)
}
export const userService = {
    register,
    getEmailValid,
    login,
    changePassword,
    getOPT,
    otpVerification,
    resetPassword
};
