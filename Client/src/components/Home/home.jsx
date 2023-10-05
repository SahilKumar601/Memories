import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid,AppBar,TextField,Button} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import Paginations from '../Paginations.jsx'
import ChipInput from 'material-ui-chip-input';
import { useLocation,useNavigate } from 'react-router-dom';
import { getPost,getPostBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles.js'

function useQuery(){
  return new URLSearchParams(useLocation.search);
}
const Home = () => {
  const [currentId, setcurrentId] = useState(null);
  const [search,setsearch] = useState('');
  const [Tags,setTags]=useState([]);
  const dispatch = useDispatch();
  const query=useQuery();
  const navigate =useNavigate();
  const page = query.get('page') || 1;
  const searhQuery = query.get('searhQuery');
  const classes=useStyles();
  const handleKeypress = (e)=>{
    if(e.keycode ===13){
      searchPost();
    }
  }
  const handleAdd=(tags)=>{setTags([...Tags,tags]);};
  const handleDelete=(tagsTodel)=>{setTags(Tags.filter((tag)=>tag!==tagsTodel))};
  const searchPost=()=>{
    if(search.trim() || Tags){
      dispatch(getPostBySearch({search,tags:Tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${Tags.join(',')}`);
    }else{
      navigate('/')
    }
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} classes={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setcurrentId={setcurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name='search'
                varient='outlined'
                onKeyDown={handleKeypress}
                label='Search Memories'
                fullWidth
                value={search}
                onChange={(e)=>setsearch(e.target.value)}/> 
              <ChipInput 
                style={{margin:'10px 0px'}}
                value={Tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
              />
              <Button onClick={searchPost} variant='contained' color='primary' className={classes.searchButton}>Search</Button>
            </AppBar>
            <Form currentId={currentId} setcurrentId={setcurrentId} />
            {(!searhQuery && !Tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginations page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
