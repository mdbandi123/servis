import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack } from '@mui/material/';
import { IconButton } from '@mui/material/';
import { FormControl, InputAdornment, InputLabel, FilledInput, TextField } from '@mui/material/';
import { Visibility, VisibilityOff } from '@mui/icons-material/';

import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalBlueHeader6 from '../../global/typographies/headers/BlueHeader6';
import GlobalPurpleHeader2 from '../../global/typographies/headers/PurpleHeader2';

function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const fullScreenDisplay = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#506AD8D9'
    }
    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh'
    }
    const registrationFormContainer = {
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: { xs: '80vh', sm: '80vh', md: '100vh', lg: '100vh', lx: '100vh' }
    }
    const centerTypography = {
        textAlign: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        display: 'flex'
    }

    return (
        <React.Fragment>
            <Grid2 sx={[fullScreenDisplay, centerAlignment]} container>
                <Grid2 sx={[registrationFormContainer]} xs={12} sm={12} md={8} lg={8} lx={8} item>
                    <Stack component="form" spacing={3}>
                        <Stack>
                            <GlobalPurpleHeader2 text="Create your Account" />
                        </Stack>
                        <Stack spacing={2}>
                            <Grid2 spacing={2} container>
                                <Grid2 xs={12} sm={12} md={6} lg={6} lx={6} item>
                                    <Box>
                                        <TextField id="outlined-textarea" color="primary" type="text" label="First Name" placeholder="Enter your First Name" variant="filled" fullWidth />
                                    </Box>
                                </Grid2>
                                <Grid2 xs={12} sm={12} md={6} lg={6} lx={6} item>
                                    <Box>
                                        <TextField id="outlined-textarea" color="primary" type="text" label="Last Name" placeholder="Enter your Last Name" variant="filled" fullWidth />
                                    </Box>
                                </Grid2>
                            </Grid2>
                            <Box>
                                <TextField id="outlined-textarea" color="primary" type="text" label="Business Name" placeholder="Enter your Business Name" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <TextField id="outlined-textarea" color="primary" type="email" label="Email" placeholder="Enter your Email" variant="filled" fullWidth />
                            </Box>
                            <Box>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput color="primary" placeholder="Enter your password" id="filled-adornment-password" type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        } />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                                    <FilledInput color="primary" placeholder="Confirm your password" id="filled-adornment-password" type={showConfirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        } />
                                </FormControl>
                            </Box>
                            <Box>
                                <GlobalBlueContainedButton text="Sign In" />
                            </Box>
                            <Grid2 sx={centerTypography} spacing={1} container>
                                <Grid2 item>
                                    <Box>
                                        <GlobalBlackHeader6 text="Have already an Account?" />
                                    </Box>
                                </Grid2>
                                <Grid2 item>
                                    <Box>
                                        <GlobalBlueHeader6 text="Login Here" />
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </React.Fragment>
    );
}

export default SignIn;