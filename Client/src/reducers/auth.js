import {AUTH,LOGOUT} from '../constant/actionType';

export default (state={authdata:null} , action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state,authdata: action?.data};
        default:
            return state;
    }
}