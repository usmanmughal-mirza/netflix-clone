import axios from 'axios';
import {getMoviesFailure,getMoviesStart,getMoviesSuccess,
deleteMovieStart,deleteMovieFailure,deleteMovieSuccess,
createMovieFailure,createMovieStart,createMovieSuccess,
updateMovieFailure,updateMovieStart,updateMovieSuccess} from './MovieActions';

// get movies -----------------------------------
// --------------------------------------
// --
export const getMovies =async(dispatch) =>{
   dispatch(getMoviesStart());

    try {
        const res=await axios.get("/movies",{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
            }
        })
        dispatch(getMoviesSuccess(res?.data))
    } catch (error) {
     dispatch(getMoviesFailure(error))   
    }
}

// delete movie -------------------------------
// ----------------------------------------------- 
// ---------------------------------------------

export const deleteMovie =async(id,dispatch) =>{
    dispatch(deleteMovieStart());
 
     try {
         const res=await axios.delete(`/movies/${id}`,{
             headers:{
                 token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
             }
         })
         dispatch(deleteMovieSuccess(id))
     } catch (error) {
      dispatch(deleteMovieFailure(error))   
     }
 }

 // create movie -------------------------------
// ----------------------------------------------- 
// ---------------------------------------------

export const createMovie =async(movie,dispatch) =>{
    dispatch(createMovieStart());
 
     try {
         const res=await axios.post(`/movies`,movie,{
             headers:{
                 token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
             }
         })
         dispatch(createMovieSuccess(res?.data))
     } catch (error) {
      dispatch(createMovieFailure(error))   
     }
 }

  // update movie -------------------------------
// ----------------------------------------------- 
// ---------------------------------------------

export const updateMovie =async(id,movie,dispatch) =>{
    dispatch(updateMovieStart());
 
     try {
         const res=await axios.put(`/movies/${id}`,movie,{
             headers:{
                 token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
             }
         })
        
        //  console.log('at success actions');
         dispatch(updateMovieSuccess(res?.data));
        //  console.log(res?.data);
        //  console.log('after success');
     } catch (error) {
      dispatch(updateMovieFailure(error))   
     }
 }