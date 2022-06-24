import axios from 'axios';
import {moviesFailure,moviesStart,moviesSuccess} from './MovieActions'
import * as api from "./API"

// when we click on login button -------------------
// ------------------------------------------------
// here we dispatch actions 

export const fetchingMovies =async(url,dispatch) =>{
    console.log(dispatch);
    dispatch(moviesStart());
    try {
        // const res=await axios.post(url)
        const res=await api.complexMovieFetching(url);
        console.log('at api calls for movies ');
        console.log(res);
          dispatch(moviesSuccess(res?.data))
        
    } catch (error) {
        console.log(error);
        dispatch(moviesFailure(error))
        
    }
}