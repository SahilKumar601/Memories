import { useSelector } from 'react-redux';
import {  Grid,CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './Style.jsx'
const Posts =({setcurrentId})=>{
    const classes=useStyles();
    const {posts} = useSelector((state)=>state.posts);
    return(
        !posts?.length ? <CircularProgress/>:(
            <Grid className={classes.container} container spacing={3} alignItems='stretch'>
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setcurrentId={setcurrentId}/>
                        </Grid>
                    ))
                }

            </Grid>
        )
    )
}
export default Posts;