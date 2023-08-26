import { Avatar,Paper,Typography,Container,Grid, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from "./input";
import { useState } from "react";

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