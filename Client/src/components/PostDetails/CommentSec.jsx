import { useEffect,useRef,useState } from "react";
import { Typography,TextField,Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './style.js';
import { commentPost } from "../../actions/posts.js";

const CommentSec = ({post}) => {
    const classes = useStyles();
    const [comments,setcomments]=useState(post?.comment);
    const [comment,setcomment] = useState([]);
    const commentRef=useRef();
    const dispatch = useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    console.log(user);
    const handleClick=async()=>{
        const finalComment=`${user.result.name}:${comment}`;
        const newComments = await dispatch(commentPost(finalComment,post._id));
        setcomments(newComments);
        setcomment('');
        commentRef.current.scrollIntoView({behavior:'smooth'});
    };  
    return ( 
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Commments</Typography>
                     {comments.map((c,i)=>(
                        <Typography key={i} guuterBottom variant='subtitle1'>
                            <strong>{c.spilt(':')[0]}</strong>
                            : {c.spilt(':')[1]}
                        </Typography>
                     ))}
                </div>
                <div ref={commentRef}/>
                {user?.result?.name && (
                <div style={{width:'70%'}}>
                    <Typography gutterBottom variant="h6">Write a Commment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        label="Write Comment here"
                        variant='outlined'
                        multiline={true}
                        value={comment}
                        onChange={(e)=>setcomment(e.target.value)}
                    />   
                    <Button style={{marginTop:'10px'}}fullWidth variant='contained' color="primary" disabled={!comment.length} onClick={handleClick}>Post</Button> 
                </div>
                )}
            </div>
        </div>
    );
}
 
export default CommentSec;