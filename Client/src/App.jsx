import React from "react";
import {Container,AppBar,Typography,Grid,Grow} from '@material-ui/core';
import Memoriesicon from './images/3837407.png';
import Posts from './components/Posts/Posts';
import Form from './components/Posts/Posts';

function App(){
        return(
            <Container maxWidth="lg">
                <AppBar position="static" color="inherit">
                    <Typography variant="h2" align="center">Memories</Typography>
                    <img src={Memoriesicon} alt="Memories"/>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        )
}

export default App;