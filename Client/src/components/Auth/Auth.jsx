import { Avatar,Paper,Typography,Container,Grid } from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';

const Auth = () => {
    const classes=useStyles();
    const isSignUp=false;
    const handleSubmit=()=>{}
    
    return ( 
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.Paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up':'Sign In'}</Typography>
                
            </Paper>
        </Container>
    );
}
 
export default Auth;