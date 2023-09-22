import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name:{type:String, required:true},
    emailid:{type:String, required:true},
    password:{type:String, required:true},
    id:{type:String}
});

export default mongoose.model('Users', userschema);