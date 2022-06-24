import {GET_MOVIES_FAILURE,GET_MOVIES_SUCCESS,GET_MOVIES_START,
DELETE_MOVIE_FAILURE,DELETE_MOVIE_START,DELETE_MOVIE_SUCCESS,
CREATE_MOVIE_FAILURE,CREATE_MOVIE_START,CREATE_MOVIE_SUCCESS,
UPDATE_MOVIE_FAILURE,UPDATE_MOVIE_START,UPDATE_MOVIE_SUCCESS} from '../constants/actionTypes';


// GET MOVIES -------------------------------------
// --------------------------------------------------
// -------------------------------------------------

export const getMoviesStart =() =>({
    type:GET_MOVIES_START
})

// if we success we get data back ...user
export const getMoviesSuccess =(movies) =>({
    type:GET_MOVIES_SUCCESS,
    payload:movies
})

// if we fail we return error 
export const getMoviesFailure =(error) =>({
    type:GET_MOVIES_FAILURE,
    payload:error
})

// DELETE MOVIE ----------------------------------
// -----------------------------------------------
// ------------------------------------------------

export const deleteMovieStart =() =>({
    type:DELETE_MOVIE_START
})

// delete movie by its id  ...
export const deleteMovieSuccess =(id) =>({
    type:DELETE_MOVIE_SUCCESS,
    payload:id 
})

// if we fail we return error 
export const deleteMovieFailure =(error) =>({
    type:DELETE_MOVIE_FAILURE,
    payload:error
})

// CREATE MOVIE ------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

export const createMovieStart =() =>({
    type:CREATE_MOVIE_START
})

export const createMovieSuccess =(movie) =>({
    type:CREATE_MOVIE_SUCCESS,
    payload:movie
})

export const createMovieFailure =() =>({
    type:CREATE_MOVIE_FAILURE
})


// UPDATE MOVIE ------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

export const updateMovieStart =() =>({
    type:UPDATE_MOVIE_START
})

export const updateMovieSuccess =(movie) =>({
    type:UPDATE_MOVIE_SUCCESS,
    payload:movie,
    
})

export const updateMovieFailure =() =>({
    type:UPDATE_MOVIE_FAILURE
})
