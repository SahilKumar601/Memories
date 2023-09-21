import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{type:String, required:true},
    emailid:{type:String, required:true},
    password:{type:String, required:true},
    id:{type:String, required:true}
});

export default mongoose.model('User', schema);