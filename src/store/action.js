import {
    ADD_TAG,
    DELETE_TAG
} from './action-type'

export const addTag = (data) => ({type:ADD_TAG,data})
export const deleteTag = (index) => ({type:DELETE_TAG,index})