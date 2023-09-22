import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/User.js';

export const signin = async(req,res)=>{
    const {emailid,password} = req.body; 
    try {
        const existingUser = await Users.findOne({emailid: emailid});
        if(!existingUser){return  res.status(404).json({message: 'User not found'})};
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){return res.status(404).json({message:'Invalid Credentials'})};
        const token = jwt.sign({emailid: existingUser.emailid, id: existingUser._id}, 'test',{expiresIn: '1h'});
        res.status(200).json({result: existingUser,token});
    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }
}
export const
 signup = async(req,res)=>{
    const {emailid,password,confirmpassword,firstname,lastname} = req.body;
    try {
        const existingUser= await Users.findOne({emailid});
        if(existingUser)return res.status(400).json({message: "User already exists"});
        if(password!==confirmpassword)return res.status(400).json({message: "Password Does Not Match"});
        const hash=await bcrypt.hash(password,12);
        const  result = await Users.create({emailid,password:hash,name:`${firstname} ${lastname}`});
        const token = jwt.sign({emailid: result.emailid, id: result._id}, 'test',{expiresIn: '1h'});
        res.status(200).json({result: result,token});    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

