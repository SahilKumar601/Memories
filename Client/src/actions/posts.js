import * as api from '../api';
import {FETCH_ALL,CREATE_POST,UPDATE,DELETE,LIKE} from '../constant/actionType';

export const getPost=()=>async(dispatch)=>{
    try{
        const {data}=await api.fetchPost();
        dispatch({type:FETCH_ALL, payload:data});
    } catch (error) {
        console.log(error.message);   
    }
}
export const createpost=(post)=>async(dispatch)=>{
    try {
        console.log(post);
        const {data}=await api.createpost(post);
        dispatch({type:CREATE_POST,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}
export const updatedPost=(id,updatedPost)=>async(dispatch)=>{
    try {
        const {data}=await api.updatedPost(id,updatedPost);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({type: DELETE, payload: id });
      console.log('set from actions creator');
    } catch (error) {
      console.log(error.message);
    }
};
export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.likePost(id);
        dispatch({type:LIKE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}