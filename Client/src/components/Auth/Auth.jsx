import { Avatar,Paper,Typography,Container,Grid, TextField, Button, Icon } from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import Input from "./input";
import { useState } from "react";
import 'dotenv/config';

const Auth = () => {
    const [showPassword,setpassword]=useState(false);
    const classes=useStyles();
    const [isSignUp,setSignUp]=useState(false);
    const switchMode=()=>{
        setSignUp((prev)=> !prev);
        handleShowPassword(false);
    }
    const handleSubmit=()=>{};
    const handlechange=()=>{};
    const handleShowPassword=()=>{setpassword((prevpass)=>{!prevpass})}
    
    return ( 
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant="h5">{isSignUp ? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstname" label='First Name' handlechange={handlechange}  autoFocus half/>
                                    <Input name="lastname" label='Last Name' handlechange={handlechange} half /> 
                                </>
                            )}
                            <Input name='emailid' label='Email Id' handleChange={handlechange} type='email'/>
                            <Input name='password' label='Password' handleChange={handlechange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword}/>
                            { isSignUp && <Input name='confirmpassword' label='Confirm Password' handleChange={handlechange} type='password'/>}
                    </Grid>
                    <GoogleLogin
                        clientID={`${process.env.google_auth_client_id}`}
                        render={(renderProps)=>(
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant='contained'> 
                            Google Sign In
                            </Button>)} 
                            onSuccess={}
                            onFailure={}
                            />
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up':'Sign In'}
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid>
                            <Button onClick={switchMode} >
                                { isSignUp ? 'Already have an Account? Sign In':'Dont Have An Account? Sign-Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
 
export default Auth;