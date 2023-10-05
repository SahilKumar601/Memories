import React from "react";
import {Container} from '@material-ui/core';
import './index.css'
import { BrowserRouter as Router, Routes,Route,} from "react-router-dom";
import Home from "./components/Home/home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App(){
        return(

                <Router>
                    <Container maxWidth="lg">
                        <Navbar/>
                        <Routes>
                            <Route path="/" exact Component={Home} />
                            <Route path='/posts' exact Component={Home}/>
                            <Route path='/posts/search' exact Component={Home}/>
                            <Route path='/posts/:id' exact Component={PostDetails}/>
                            <Route path="/auth" exact Component={Auth}/>    //condition wasn't working properly !user || user==null navigate to auth page else navigate to post(home page);
                        </Routes>
                    </Container>
                </Router>
            
        )
}

export default App;