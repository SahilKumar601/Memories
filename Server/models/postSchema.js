import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema=new Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const postMessage=mongoose.model('PostMessage',postSchema)
export default postMessage;