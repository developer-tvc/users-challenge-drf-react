import * as actionType from "../action/updateListActionComponent"
const initialState = {List:[]}
const updateListReducer = (state = initialState,action) =>{
    switch(action.type){
        case actionType.LIST_SUCCESS:
            return{
                ...state,List:action.result
            }
        case actionType.LIST_FAILED:
            return{
                ...state
            }
        default:
            return state    
    }
}
export default updateListReducer