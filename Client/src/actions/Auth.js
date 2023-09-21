import {AUTH} from '../constant/actionType';
import * as api from '../api/index';

export const sigin =(formdata, navigate)=>async(dispatch)=>{ 
    try {
        
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
export const logout =(formdata, navigate)=> async(dispatch)=>{
    try {
        
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}