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

function SignUp() {
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
    const textField = {
        m: 1
    }
    const containInfoBtn = {
        backgroundColor: '#4a6ae3',
    }
    const inlineTxt = {
        display: 'inline'
    }
    const inlineTxtB = {
        display: 'inline',
        fontWeight: 'bold'
    }

    return (
        <React.Fragment>
            <Grid2 container spacing={0} sx={[ centerContainer]}>
                <Grid2 item sx={[signInContainer, centerContainer]} lx={8} lg={8} md={8} sm={8} xs={8}>
                    <Box component="form" >
                        <Box>
                            <ThemeProvider theme={secondaryTxt}>
                                <Typography variant="h1">Create Account</Typography>
                            </ThemeProvider>
                        </Box>
                        <Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="text" label="First Name" placeholder="Enter your First Name" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="text" label="Last Name" placeholder="Enter your Last Name" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="text" label="Business" placeholder="Enter your Business Name" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="email" label="Email" placeholder="Enter your Email" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="password" label="Password" placeholder="Enter your Password" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField sx={textField} id="outlined-textarea" color="secondary" type="password" label="Confirm Password" placeholder="Repeat your Password" variant="filled" fullWidth />
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Button sx={containInfoBtn} variant="contained" disableRipple>Sign Up</Button>
                            </Box>
                        </Box>
                        <Box>
                            <ThemeProvider theme={secondaryTxt}>
                                <Typography variant="body1" sx={inlineTxt}>Have already an account? </Typography>
                                <Typography variant="body1" sx={inlineTxtB}>Login Here</Typography>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </React.Fragment>
    );
}

export default SignUp;