import {AUTH} from '../constant/actionType';
import * as api from '../api/index';

export const signin =(formdata, navigate)=>async(dispatch)=>{ 
    try {
        const { data }=await api.signin(formdata);
        dispatch({type:AUTH,data});
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
export const signup =(formdata, navigate)=> async(dispatch)=>{
    try {
        const {data}=await api.signup(formdata);
        dispatch({type:AUTH,data});
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}