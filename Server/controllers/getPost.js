import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postSchema.js';

const router = express.Router();
export const getPosts = async (req, res) => {
    const {page}=req.query;
    try{
        const Limit=8;
        const startIndex=(Number(page)-1)*Limit;
        console.log(startIndex);
        const totalPages=await PostMessage.countDocuments({});
        const posts=await PostMessage.find().sort({_id:-1 }).limit(Limit).skip(startIndex);
        console.log(posts);
        res.status(200).json({data:posts,currentPage:Number(page), numberofPages:Math.ceil(totalPages/Limit)});
    }
    catch(err){
        res.status(404).json({message:err})
    }
}
export const getPost=async(req,res)=>{
    const {id} =req.params;
    try{
    const post=await PostMessage.findById(id);
    res.status(200).json(post);
    }catch(error){
        res.status(404).json({message:error.message});    
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
export const getPostBySearch=async(req,res)=>{
    const {searchQuery,tags}=req.query
    console.log(req.query);
    try {
        const title=new RegExp(searchQuery, 'i');
        const tagsArray = tags.split(',').map(tag => tag.trim());
        const post = await PostMessage.find({$or:[ {title} ,{tags:{$in:tagsArray}}]});
        console.log(post);
        res.json({data:post});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
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