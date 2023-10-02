import {FETCH_ALL,CREATE_POST,UPDATE,FETCH_BY_SEARCH,DELETE,LIKE} from '../constant/actionType';
export default (state={posts:[]}, action) =>{
    switch (action.type) {
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        case UPDATE:
            return (state.map((post)=>post._id===action.payload._id ? action.payload : post));
        case LIKE:
                return (state.map((post)=>post._id===action.payload._id ? action.payload : post));
        case FETCH_BY_SEARCH:
            return {...state,posts:action.payload};
        case FETCH_ALL:
            return {
                    ...state,
                    posts:action.payload.data,
                    currentPage:action.payload.currentPage,
                    numberofPages:action.payload.numberofPages,
                };
        case CREATE_POST:
            return [...state,action.payload]
        default:
            return state;
    }
}