import useStyles from './Style.jsx'
import { Button, Card,CardActions,CardContent,CardMedia,Typography,ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete'; 
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts.js';
import { useNavigate } from 'react-router-dom';

const Post =({post,setcurrentId})=>{
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes=useStyles();
    const navigate=useNavigate();
    const Likes = () => {
    if (post.likes?.length > 0) {          
          const liked = post.likes.find((like) => like === (user?.result?.sub || user?.result?._id));
          return liked ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
        }
        return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
      };
    const openPost=()=>{
        navigate(`/posts/${post._id}`);
    }
    return(
        <Card className={classes.card} raised elevation={6} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator)&& (
                    <div className={classes.overlay2}>
                        <Button 
                            style={{color:'white'}} 
                            size='small' 
                            onClick={()=>{setcurrentId(post._id)}}>
                                <MoreHorizIcon fontSize='default'/>
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography> 
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography  variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
                </CardContent>   
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
                    <Likes/>
                </Button>
                {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator)&& (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small'/>
                        &nbsp;Delete&nbsp;
                    </Button>
                )}
            </CardActions>
        </Card>  
    )
}

export default Post;