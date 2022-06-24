import { useState } from 'react';
import './login.css';
import {useContext} from 'react'
import {AuthContext} from '../../context/authContext/AuthContext'
import {login} from '../../context/authContext/apiCalls';
 
const initialState={
    email:'',
    password:''
}
const Login = () => {
    const [form,setForm]=useState(initialState);
    const {isFetching,dispatch}=useContext(AuthContext);
   


    const changeHandler =(e) =>{
        const {value,name}=e.target;

        setForm({
            ...form,
            [name]:value
        })
    }

const handleLogin =(e) =>{
e.preventDefault();
// when we click on login button we call this function 

login(form,dispatch);
}
    return (
        <>
          <form className="login" onSubmit={handleLogin} >
              <div className="loginForm"> 

              <input type="text" onChange={changeHandler} name="email"
           value={form.email}   placeholder="email" className="loginInput" />
              <input type="password" onChange={changeHandler}
         value={form.password}     placeholder="password" name="password"
               className="loginInput" />

              <button type="submit"
               className="loginButton">Login </button>
              </div>

              </form>  
        </>
    )
}

export default Login
