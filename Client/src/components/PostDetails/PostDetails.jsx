import { useEffect } from "react";
import { Paper,Typography,CircularProgress,Divider } from "@material-ui/core";
import { useDispatch,useSelector } from "react-redux";
import moment from "moment";
import { useParams,useNavigate } from "react-router-dom";
import useStyles from './style.js';
import CommentSection from "./CommentSec.jsx";
import { getPostBySearch, getpost } from "../../actions/posts";
const PostDetails = () => {
  const {post,posts,isLoading} = useSelector((state)=>state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {id} = useParams();
  useEffect(()=>{
    dispatch(getpost(id));
  },[id]);
  useEffect(()=>{
    if(post) dispatch(getPostBySearch({search:'none',tags:post?.tags.join(',')}));
  },[post]);
  const openPost=(_id)=>{
    navigate(`/posts/${_id}`);
  }
  const recommendedPosts=posts.filter(({_id})=>_id!==post._id);
  if(isLoading){
    return(
      <Paper className={classes.loadingPaper} elevation={6}>
          <CircularProgress size='7em'/>
        </Paper>
      ); 
  }
  if(!post) return null;
  console.log(recommendedPosts);
  return ( 
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} style={{width:'550px'}} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {(recommendedPosts.length>0)&&(
          <div className={classes.section}>
            <Typography gutterBottom variant='h5'>You Might Also Like These</Typography>
            <Divider/>
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({title,name,selectedFile,message,likes,_id})=>(
                <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                  <Typography gutterBottom variant="h6">Likes:{likes.length}</Typography>
                  <img src={selectedFile} width='100px'/>
                </div>
              ))}
            </div>
          </div>
      )}
    </Paper>  
  );
}
 
export default PostDetails;