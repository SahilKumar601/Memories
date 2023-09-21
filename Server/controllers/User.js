import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signin = async(req,res)=>{
    const {emailid,password} = req.body; 
    try {
        const existingUser = await User.findOne({emailid: emailid});
        if(!existingUser){return  res.status(404).json({message: 'User not found'})};
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){return res.status(404).json({message:'Invalid Credentials'})};
        const token = jwt.sign({emailid: existingUser.emailid, id: existingUser._id}, 'test');
        res.status(200).json({result: existingUser,token});
    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }
}
export const sigup = async(req,res)=>{

}

