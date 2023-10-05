import {FETCH_ALL,CREATE_POST,UPDATE,FETCH_BY_SEARCH,DELETE,LIKE, START_LOADING, END_LOADING} from '../constant/actionType';
export default (state={ isLoading:true,posts:[] },action) =>{
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading: true};
        case END_LOADING:
            return {...state,isLoading: false};
        case DELETE:
            return {...state,post:state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
            return {...state,post:(state.posts.map((post)=>post._id===action.payload._id ? action.payload : post))};
        case LIKE:
                return {...state,posts:(state.posts.map((post)=>post._id===action.payload._id ? action.payload : post))};
        case FETCH_BY_SEARCH:
            return {...state,posts:action.payload.data};
        case FETCH_ALL:
            return {
                    ...state,
                    posts:action.payload.data,
                    currentPage:action.payload.currentPage,
                    numberofPages:action.payload.numberofPages,
                };
        case CREATE_POST:
            return {...state,post:[...state.posts,action.payload]};
        default:
            return state;
    }
}