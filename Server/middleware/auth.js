import jwt from 'jsonwebtoken';

const auth=async(req,res,next)=>{
    try{    
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        const isCutomAuth=token.length<200;
        let decodeoded;
        if(token && isCutomAuth){
            console.log('Google TOken');
            req.userId=token;
            console.log(req.userId);
        }else{
            decodeoded=jwt.verify(token,'test');
            req.userId=decodeoded?.id;
        }
        next();
    }catch(error){
        console.log(error);
    }
}
export default auth;