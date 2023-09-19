import React from "react";
import {Container} from '@material-ui/core';
import './index.css'
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from "./components/Home/home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

function App(){
        return(
            
                <Router>
                    <Container maxWidth="lg">
                        <Navbar/>
                        <Routes>
                            <Route path="/" exact Component={Home}/>
                            <Route path="/auth" exact Component={Auth}/>
                        </Routes>
                    </Container>
                </Router>
            
        )
}

export default App;