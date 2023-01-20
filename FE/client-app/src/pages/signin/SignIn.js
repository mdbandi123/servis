import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        m: 1
    }
    const containInfoBtn = {
        backgroundColor: '#4a6ae3',
    }
    const containLightBtn = {
        backgroundColor: '#FFFFFF',
        '&:hover': {
            background: "#E7E7E7",
        },
        color: '#432353'
    }

    return (
        <React.Fragment>
            <Grid2 container spacing={0} sx={[fullScreenContainer, centerContainer]}>
                <Grid2 item sx={[signInContainer, centerContainer]} lx={8} lg={8} md={8} sm={8} xs={8}>
                    <Box component="form" >
                        <Box>
                            <ThemeProvider theme={secondaryTxt}>
                                <Typography variant="h1">Login your Account</Typography>
                                <Typography variant="body1">to start manage your data</Typography>
                            </ThemeProvider>
                        </Box>
                        <Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="email" label="Email" placeholder="Enter your Email" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="password" label="Password" placeholder="Enter your Password" variant="filled" fullWidth />
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Button sx={containInfoBtn} variant="contained" disableRipple>Sign In</Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 item sx={[registrationContainer, centerContainer]} lx={4} lg={4} md={4} sm={4} xs={4}>
                    <Box component="form" >
                        <Box>
                            <ThemeProvider theme={lightTxt}>
                                <Typography variant="h1">No Account?</Typography>
                                <Typography variant="body1">Sign up and explore managing data</Typography>
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