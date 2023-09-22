import  Express  from "express";
import {getPost,createPost, updatePost, deletePost,likePost} from "../controllers/getPost.js"
import auth from '../middleware/auth.js'
const router = Express.Router();

router.get('/',getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likepost',auth,likePost);
export default router;
