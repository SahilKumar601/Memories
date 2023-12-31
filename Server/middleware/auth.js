import jwt from 'jsonwebtoken';

const auth=async(req,res,next)=>{
    try{    
        const token=req.headers.authorization.split(" ")[1];
        const isCutomAuth=token.length<200;
        let decodeoded;
        if(token && isCutomAuth){
            req.userId=token;
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