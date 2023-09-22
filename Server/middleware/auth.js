import jwt from 'jsonwebtoken';

const auth=async(req,res,next)=>{
    try{    
        const token=req.headers.authorization.split(" ")[1];
        const isCutomAuth=token.length<500;
        let decodeoded;
        if(token && isCutomAuth){
            decodeoded=jwt.verify(token,'test');
            req.userId=decodeoded?.id;
        }else{
            decodeoded=jwt.decode(token);
            req.userId=decodeoded?.sub;
        }
        next();
    }catch(error){
        console.log(error);
    }
}
export default auth;