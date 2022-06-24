import {GET_MOVIES_START,GET_MOVIES_SUCCESS,GET_MOVIES_FAILURE} from "../constants/actionTypes"

export const movieReducer =(state,action) =>{
    switch(action.type){
        case GET_MOVIES_START:
            return{
                movies:null,
                isFetching:true,
                error:false
            };
         case GET_MOVIES_SUCCESS:
             return{
                 movies:action.payload,
                 isFetching:false,
                 error:false
             };   
           case GET_MOVIES_FAILURE:
               return{
                   movies:[],
                   isFetching:false,
                   error:true
               }  
             
        default:return { ...state};
    }
}