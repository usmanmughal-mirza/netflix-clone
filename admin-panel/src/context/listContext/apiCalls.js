import axios from 'axios';
import {getListsFailure,getListsStart,getListsSuccess,
deleteListFailure,deleteListStart,deleteListSuccess,
updateListStart,updateListSuccess,updateListFailure,
createListStart,createListSuccess,createListFailure} from  "./ListsActions"

// get lists -----------------------------------
// --------------------------------------
// --
export const getLists =async(dispatch) =>{
   dispatch(getListsStart());

    try {
        const res=await axios.get("/lists",{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
            }
        })
        dispatch(getListsSuccess(res?.data))
    } catch (error) {
     dispatch(getListsFailure(error))   
    }
}

// delete movie -------------------------------
// ----------------------------------------------- 
// ---------------------------------------------

export const deleteList =async(id,dispatch) =>{
    dispatch(deleteListStart());
 
     try {
            await axios.delete(`/lists/${id}`,{
             headers:{
                 token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
             }
         })
         dispatch(deleteListSuccess(id))
     } catch (error) {
      dispatch(deleteListFailure(error))   
     }
 }

//  // create movie -------------------------------
// // ----------------------------------------------- 
// // ---------------------------------------------

export const createList =async(list,dispatch) =>{
    dispatch(createListStart());
 
     try {
         const res=await axios.post(`/lists`,list,{
             headers:{
                 token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
             }
         })
         dispatch(createListSuccess(res?.data))
     } catch (error) {
      dispatch(createListFailure(error))   
     }
 }

//   // update movie -------------------------------
// // ----------------------------------------------- 
// // ---------------------------------------------

export const updateList =async(id,movie,dispatch) =>{
    dispatch(updateListStart());
 console.log('before api call');
     try {
         const res=await axios.put(`/lists/${id}`,movie,{
             headers:{
                 token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
             }
         })
        
        
         dispatch(updateListSuccess(res?.data));
         console.log('after call');
         
     } catch (error) {
      dispatch(updateListFailure(error))   
     }
 }