import * as api from '../api';
import {FETCH_ALL,CREATE_POST,UPDATE,DELETE,LIKE,FETCH_BY_SEARCH,END_LOADING, START_LOADING, FETCH_POST} from '../constant/actionType';

export const getPosts=(page)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        const { data: { data, currentPage, numberofPages } } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberofPages } });
        dispatch({ type:END_LOADING});
    } catch (error) {
        console.log(error.message);   
    }
}
export const getpost=(id)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING});
        const {data}=await api.fetchPost(id);
        dispatch({type:FETCH_POST,payload:data});
        dispatch({type:END_LOADING});
    }catch(error){
        console.log(error.message);
    }
}
export const createpost=(post)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.createpost(post);
        dispatch({type:CREATE_POST,payload:data});
        dispatch({type:END_LOADING});
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
    } catch (error) {
      console.log(error.message);
    }
}
export const getPostBySearch=(searchQuery)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data:{data}}=await api.fetchPostBySearch(searchQuery);
        console.log(data);
        dispatch({type: FETCH_BY_SEARCH, payload: {data}});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
}
export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.likePost(id);
        dispatch({type:LIKE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}