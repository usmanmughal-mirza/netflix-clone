import {GET_LISTS_FAILURE,GET_LISTS_START,GET_LISTS_SUCCESS,
DELETE_LISTS_START,DELETE_LISTS_SUCCESS,DELETE_LISTS_FAILURE,
UPDATE_LISTS_FAILURE,UPDATE_LISTS_START,UPDATE_LISTS_SUCCESS,
CREATE_LIST_FAILURE,CREATE_LIST_START,CREATE_LIST_SUCCESS} from '../constants/actionTypes'

// GET LISTS-------------------------------------
// --------------------------------------------------
// -------------------------------------------------

export const getListsStart =() =>({
    type:GET_LISTS_START
})


export const getListsSuccess =(lists) =>({
    type:GET_LISTS_SUCCESS,
    payload:lists
})


export const getListsFailure =(error) =>({
    type:GET_LISTS_FAILURE,
    payload:error
})

// DELETE MOVIE ----------------------------------
// -----------------------------------------------
// ------------------------------------------------

export const deleteListStart =() =>({
    type:DELETE_LISTS_START
})

// delete List by its id  ...
export const deleteListSuccess =(id) =>({
    type:DELETE_LISTS_SUCCESS,
    payload:id 
})

// if we fail we return error 
export const deleteListFailure =(error) =>({
    type:DELETE_LISTS_FAILURE,
    payload:error
})

// CREATE MOVIE ------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

export const createListStart =() =>({
    type:CREATE_LIST_START
})

export const createListSuccess =(list) =>({
    type:CREATE_LIST_SUCCESS,
    payload:list
})

export const createListFailure =() =>({
    type:CREATE_LIST_FAILURE
})


// UPDATE MOVIE ------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

export const updateListStart =() =>({
    type:UPDATE_LISTS_START
})

export const updateListSuccess =(list) =>({
    type:UPDATE_LISTS_SUCCESS,
    payload:list,
    
})

export const updateListFailure =() =>({
    type:UPDATE_LISTS_FAILURE
})
