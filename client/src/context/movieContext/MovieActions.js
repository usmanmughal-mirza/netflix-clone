import {GET_MOVIES_FAILURE,GET_MOVIES_SUCCESS,GET_MOVIES_START} from '../constants/actionTypes';

export const moviesStart =() =>({
    type:GET_MOVIES_START
})

// if we success we get data back ...user
export const moviesSuccess =(movies) =>({
    type:GET_MOVIES_SUCCESS,
    payload:movies
})

// if we fail we return error 
export const moviesFailure =(error) =>({
    type:GET_MOVIES_FAILURE,
    payload:error
})

