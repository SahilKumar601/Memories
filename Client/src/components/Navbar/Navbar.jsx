import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import memoriesIcon from '../../images/memoriesLogo.png';
import memoriesTitle from '../../images/memoriesText.png';
import useStyles from './styles';
import * as actionTypes from '../../constant/actionType';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const logout=()=>{
    dispatch({type:'LOGOUT'})
    navigate('/auth');
    setuser(null);
  }
  useEffect(() => {
      const token = user?.token;
      if(token?.length<100){
        localStorage.clear();
      }else if(token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setuser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer}>
        <img className={classes.image} src={memoriesTitle} height='45px'/>
        <img className={classes.image} src={memoriesIcon} height='40px'/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;