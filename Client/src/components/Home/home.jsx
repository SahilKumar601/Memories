import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import Paginations from '../Paginations.jsx'
import { getPost } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setcurrentId={setcurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setcurrentId={setcurrentId} />
            <Paper elevation={6}>
              <Paginations/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
