import {LOGIN_START,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT} from '../constants/actionTypes';

export const LoginStart =() =>({
    type:LOGIN_START
})

// if we success we get data back ...user
export const LoginSuccess =(user) =>({
    type:LOGIN_SUCCESS,
    payload:user
})

// if we fail we return error 
export const LoginFailure =(error) =>({
    type:LOGIN_FAILURE,
    payload:error
})

// logout user --------------------------------------
// -----------------------------------------------
// ------------------------------

export const logout =() =>({
    type:LOGOUT
})