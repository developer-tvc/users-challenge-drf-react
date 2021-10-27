import axios from "axios";
import { SERVER_URL
 } from "../../constant";
export const LIST_SUCCESS = "LIST_SUCCESS"
export const LIST_FAILED = "LIST_FAILED"

export const getListSuccess = (res)=>{
    return{
        type:LIST_SUCCESS,
        result:res
    }
}

export const getListFailed = (res)=>{
    return{
        type:LIST_FAILED,
        result:res
    }
}
export const getList = ()=>{
    return(dispatch) => {
        axios.get(`${SERVER_URL}users-list/`).then((response)=>{
            console.log(response)
            dispatch(getListSuccess(response.data))
        }).catch((error)=>{
            dispatch(getListFailed())
        })
    }
}