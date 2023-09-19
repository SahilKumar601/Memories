import { Avatar,Paper,Typography,Container,Grid, TextField, Button, Icon } from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import { GoogleLogin,GoogleOAuthProvider,googleLogout } from '@react-oauth/google';
import Input from "./Input";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";

const Auth = () => {
    const [showPassword,setpassword]=useState(false);
    const classes=useStyles();
    const dispatch = useDispatch(); 
    const [isSignUp,setSignUp]=useState(false);
    const switchMode=()=>{
        setSignUp((prev)=> !prev);
        handleShowPassword(false);
    }
    const handleSubmit=()=>{};
    const handlechange=()=>{};
    const handleShowPassword=()=>{setpassword((prevpass)=>{!prevpass})}
    const googleOnsuccess=async(res)=>{
            const decode=jwt_decode(res?.credential);
            const result={picture:decode?.picture,email:decode?.email,name:decode?.name};
            console.log(result);
            const token=decode?.sub;
            try {
                dispatch({type:'AUTH', data:{result,token}});
            } catch (error) {
                console.error(error);
            }
    }

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
                    <Button variant="contained" type="submit" fullWidth hidden className={classes.submit}>
                    <GoogleOAuthProvider clientId="424169905230-30vop05s5lnfm1ee16b8s5sfv6mpi0ib.apps.googleusercontent.com">
                    <GoogleLogin
                        
                        renderButton={()=>(
                            <button></button>
                        )}
                      onSuccess={credentialResponse => googleOnsuccess(credentialResponse)}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                    </GoogleOAuthProvider>
                    </Button>
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