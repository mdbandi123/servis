import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

const secondaryTxt = createTheme();
const lightTxt = createTheme();

secondaryTxt.typography.h1 = {
    color: '#432353'
};

secondaryTxt.typography.body1 = {
    color: '#432353'
};

lightTxt.typography.h1 = {
    color: '#FFFFFF'
};

lightTxt.typography.body1 = {
    color: '#FFFFFF'
};

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const fullScreenContainer = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
    }
    const centerContainer = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh', 
    }
    const signInContainer = {
        backgroundColor: '#EFEFEF',
    }
    const registrationContainer = {
        backgroundColor: '#506ad8',
    }
    const textField = {
        m: 1,
        width: 400,

    }
    const containInfoBtn = {
        backgroundColor: '#4a6ae3',
        borderRadius: 3,
        pl: 4,
        pr: 4,
        pt: 1,
        pb: 1,
        fontSize: 16,
        mt: 2,
        fontWeight: 'bold'
    }
    const containLightBtn = {
        backgroundColor: '#FFFFFF',
        '&:hover': {
            background: "#E7E7E7",
        },
        color: '#432353',
        borderRadius: 3,
        pl: 4,
        pr: 4,
        pt: 1,
        pb: 1,
        fontSize: 16,
        fontWeight: 'bold'
    }
    const loginStyle = {
        fontSize: 65,
        marginBottom: 2
    }
    const underLogin = {
        fontSize: 30,
        marginBottom: 10
    }
    const noAccount = {
        fontSize: 65,
        marginBottom: 3
    }
    const signUp = {
        fontSize: 35,
        marginBottom: 22,
        
    }
    

    return (
        <React.Fragment>
            <Grid2 container spacing={0} sx={[fullScreenContainer, centerContainer]}>
                <Grid2 item sx={[signInContainer, centerContainer]} lx={8} lg={8} md={8} sm={8} xs={8}>
                    <Box component="form" >
                        <Box>
                            <ThemeProvider theme={secondaryTxt}>
                                <Typography sx={[loginStyle]} variant="h1">Login to your Account</Typography>
                                <Typography sx={[underLogin]} variant="body1">to start manage your data</Typography>
                            </ThemeProvider>
                        </Box>
                        <Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="email" label="Email" placeholder="Enter your Email" variant="filled"/>
                            </Box>
                            <Box>
                                <TextField InputProps={{ endAdornment: ( 
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ?  <Visibility /> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>)}} 
                                sx={textField} id="outlined-textarea" color="secondary" type={showPassword ? 'text' : 'password'} label="Password" placeholder="Enter your Password" variant="filled"/>
                            </Box>
                        </Box>
                       
                        <Box>
                            <Box>
                                <Button  sx={containInfoBtn} variant="contained" disableRipple >Sign In</Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 item sx={[registrationContainer, centerContainer]} lx={4} lg={4} md={4} sm={4} xs={4}>
                    <Box component="form" >
                        <Box>
                            <ThemeProvider theme={lightTxt}>
                                <Typography sx={[noAccount]} variant="h1">No Account?</Typography>
                                <Typography sx={[signUp]} variant="body1">Sign up and explore <br/> managing data</Typography>
                            </ThemeProvider>
                        </Box>
                        <Box>
                            <Box>
                                <Button sx={containLightBtn} variant="contained" disableRipple>Sign Up</Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </React.Fragment>
    );
}

export default SignIn;