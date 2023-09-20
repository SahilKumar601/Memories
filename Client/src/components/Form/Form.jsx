import { useEffect, useState } from 'react';
import useStyles from './Style.jsx'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import {createpost, updatedPost} from '../../actions/posts.js'
import { Typography, TextField, Button,Paper } from '@material-ui/core';
const Form =({currentId,setcurrentId})=>{
    const classes=useStyles();
    const [postdata,setdata]=useState({ creator:'',title:'',message:'',tags:'',selectedFile:''});
    const post=useSelector((state)=>currentId ? state.posts.find((p)=> p._id===currentId) : null);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(post) setdata(post);
    },[post]);
    const clear=()=>{
        setcurrentId(null);
        setdata({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        if(currentId === null){
            dispatch(createpost(postdata));
        }else{
            dispatch(updatedPost(currentId,postdata))
        }
        clear();
    }
    return(
        <Paper className={classes.paper}>
            <form method='POST' autoComplete='off' noValidate onSubmit={handlesubmit} className={`${classes.root} ${classes.form}`}>
                <Typography variant='h6'>{currentId ? 'Editting' : 'Creating'} Memories</Typography>
                <TextField name='creator' variant='outlined' label='creator' fullWidth value={postdata.creator} onChange={(e)=>setdata({...postdata,creator:e.target.value})}/>
                <TextField name='title' variant='outlined' label='title' fullWidth value={postdata.title} onChange={(e)=>setdata({...postdata,title:e.target.value})}/>
                <TextField name='message' variant='outlined' label='message' fullWidth value={postdata.message} onChange={(e)=>setdata({...postdata,message:e.target.value})}/>
                <TextField name='tags' variant='outlined' label='tags' fullWidth value={postdata.tags} onChange={(e)=>setdata({...postdata,tags:e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                <FileBase type='file' multiple={false} onDone={({base64})=>setdata({...postdata,selectedFile:base64})}/> </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' size='small' color='secondary' fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}
export default Form;