import {GET_LISTS_FAILURE,GET_LISTS_START,GET_LISTS_SUCCESS,
DELETE_LISTS_FAILURE,DELETE_LISTS_START,DELETE_LISTS_SUCCESS,
UPDATE_LISTS_FAILURE,UPDATE_LISTS_SUCCESS,UPDATE_LISTS_START,
CREATE_LIST_FAILURE,CREATE_LIST_START,CREATE_LIST_SUCCESS} from "../constants/actionTypes"
 
export const listReducer =(state,action) =>{
    switch(action.type){

        // GET -----------------------------------

        case GET_LISTS_START:
            return{
                lists:[],
                isFetching:true,
                error:false
            };

         case GET_LISTS_SUCCESS:
             return{
                 lists:action.payload,
                 isFetching:false,
                 error:false
             };   

           case GET_LISTS_FAILURE:
               return{
                   lists:[],
                   isFetching:false,
                   error:true
               }  

            //    DELETE -------------------
            case DELETE_LISTS_START:
                return{
                    ...state,
                    isFetching:true,
                    error:false
                };
    
             case DELETE_LISTS_SUCCESS:
                 return{
                     lists:state.lists.filter( (list)=>list._id !== action.payload ),
                     isFetching:false,
                     error:false
                 };   
    
               case DELETE_LISTS_FAILURE:
                   return{
                       ...state,
                       isFetching:false,
                       error:true
                   }  
           
                //    CREATE --------------------
                case CREATE_LIST_START:
                    return{
                        ...state,
                        isFetching:true,
                        error:false
                    };

                    case CREATE_LIST_SUCCESS:
                        return{
                            lists:[action.payload,...state.lists],
                            isFetching:false,
                            error:false
                        };

                        case CREATE_LIST_FAILURE:
                            return{
                                ...state,
                                isFetching:false,
                                error:true
                            };

                            // UPDATE ------------------
                            
                case UPDATE_LISTS_START:
                    return{
                        ...state,
                        isFetching:true,
                        error:false
                    };

                    case UPDATE_LISTS_SUCCESS:
                        return{
                            lists:state.lists.map( (list)=>list._id ===action.payload._id &&action.payload  ) ,
                            isFetching:false,
                            error:false
                        };

                        case UPDATE_LISTS_FAILURE:
                            return{
                                ...state,
                                isFetching:false,
                                error:true
                            };
        default:return { ...state};
    }
}