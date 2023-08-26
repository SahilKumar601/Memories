import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ( { half,name,autoFocus,label,handleChange,handleShowPassword,type }) => {
    return ( 
        <Grid xs={12} sm={half ? 6:12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={ name === 'password' ? {
                    endAdornment : (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type==='password' ? <VisibilityIcon />:<VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }: null}
            />
        </Grid>
     );
}
 
export default Input;