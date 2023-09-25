import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postSchema.js';

const router = express.Router();
export const getPost = async (req, res) => {
    try{
    const postmessage=await PostMessage.find();
    console.log(postmessage);
    res.status(200).json(postmessage)
    }
    catch(err){
        res.status(404).json({message:err})
    }
}
export const createPost = async (req,res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post,creator:req.userId, createdAt:new Date().toISOString()});
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        console.log('error:',error.message);
    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost=async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){return res.status(404).send('404 Not Found')}
    await PostMessage.findByIdAndRemove(id);
    console.log('Deleted');
    res.json({message:'delete message'})
}
export const likePost=async(req,res)=>{
    const {id}=req.params;
    if(!req.userId)return res.json({message:'Log In First'});
    if(!mongoose.Types.ObjectId.isValid(id)){return res.status(404).send('404 Not Found')}
    const post=await PostMessage.findById(id);
    const index= post.likes.findIndex((id)=> id === String(req.userId));
    if (index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes= post.likes.filter((id)=> id !== req.userId);
    }
    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.status(200).json(updatedPost);
}
export default router;