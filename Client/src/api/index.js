import axios from 'axios';

const API =  axios.create({baseURL:'http://localhost:5000/'});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPost= (page) => API.get(`/posts?page=${page}`);
export const createpost=(post) => API.post('/posts',post);
export const deletePost=(id) => API.delete(`/posts/${id}`);
export const updatedPost=(id,updatedPost)=> API.patch(`/posts/${id}`,updatedPost);
export const likePost=(id)=> API.patch(`/posts/${id}/likepost`);
export const fetchPostBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const signin =(formdata)=>API.post('/users/signin',formdata);
export const signup =(formdata)=>API.post('/users/signup',formdata);