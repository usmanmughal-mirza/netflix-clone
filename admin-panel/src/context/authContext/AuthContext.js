import {authReducer} from './AuthReducers';
import {createContext, useEffect, useReducer} from 'react'

const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user")) || null ,
    isFetching:false,
    error:false
}

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(authReducer,INITIAL_STATE);

    // when click on logout button it calls action and goes to 
    // reducer that set user to null and here state is update 
    // when user change useEffect runs and again update user 
    // in localStorage 
    
    useEffect( () =>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return (
        <>
          <AuthContext.Provider value={{
              user:state.user,
              isFetching:state.isFetching,
              error:state.error,
              dispatch
          }}>
              {children}
              </AuthContext.Provider>  
        </>
    )
}
