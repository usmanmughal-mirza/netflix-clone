import axios from 'axios';
import {LoginStart,LoginSuccess,LoginFailure} from './AuthActions'


// when we click on login button -------------------
// ------------------------------------------------
// here we dispatch actions 

export const login =async(user,dispatch) =>{
    
    dispatch(LoginStart());
    try {
        const res=await axios.post("auth/login",user)
        res?.data?.isAdmin &&  dispatch(LoginSuccess(res?.data))
        
    } catch (error) {
        dispatch(LoginFailure(error))
        
    }
}