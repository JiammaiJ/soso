import { combineReducers } from 'redux'
import {
    ADD_TAG,
    DELETE_TAG
} from './action-type'

const initTags=[]
const tags = (state=initTags,action) => {
    switch(action.type){
        case ADD_TAG:{
            const isRepeat = state.find(item => item.path===action.data.path)
            if(!isRepeat){
                return [...state,action.data]
            }else{
                return state
            }
        }
        case DELETE_TAG: {
                return state.filter((item,index) => index!==action.index)
        }
        default :
            return state
    }
}

export default combineReducers({
    tags
})