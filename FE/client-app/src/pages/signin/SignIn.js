import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack } from '@mui/material/';
import { IconButton } from '@mui/material/';
import { FormControl, InputAdornment, InputLabel, FilledInput, TextField } from '@mui/material/';
import { Visibility, VisibilityOff } from '@mui/icons-material/';

import GlobalBlueContainedButton from '../../global/buttons/BlueContainedButton';
import GlobalWhiteContainedButton from '../../global/buttons/WhiteContainedButton';
import GlobalPurpleHeader from '../../global/typographies/PurpleHeader';
import GlobalWhiteHeader from '../../global/typographies/WhiteHeader';
import GlobalWhiteBody from '../../global/typographies/WhiteBody';
import GlobalBlackBody from '../../global/typographies/BlackBody';

function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const fullScreenDisplay = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
    }
    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
    }
    const signInContainer = {
        height: { xs: '50vh', sm: '50vh', md: '100vh', lg: '100vh', lx: '100vh' }
    }
    const signUpContainer = {
        backgroundColor: '#506AD8D9',
        height: { xs: '50vh', sm: '50vh', md: '100vh', lg: '100vh', lx: '100vh' }
    }

    return (
        <React.Fragment>
            <Grid2 container sx={[fullScreenDisplay, centerAlignment]}>
                <Grid2 item sx={[signInContainer, centerAlignment]} xs={12} sm={12} md={8} lg={8} lx={8}>
                    <Stack component="form" spacing={5}>
                        <Stack>
                            <GlobalPurpleHeader text="Login your Account" />
                            <GlobalBlackBody text="to start manage your data" />
                        </Stack>
                        <Stack spacing={3}>
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
                                <GlobalBlueContainedButton text="Sign In" />
                            </Box>
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 item sx={[signUpContainer, centerAlignment]} xs={12} sm={12} md={4} lg={4} lx={4}>
                    <Stack component="form" spacing={5}>
                        <Stack>
                            <GlobalWhiteHeader text="No Account?" />
                            <GlobalWhiteBody text="Sign up and explore managing data" />
                        </Stack>
                        <Stack>
                            <Box>
                                <GlobalWhiteContainedButton text="Sign Up" />
                            </Box>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </React.Fragment>
    );
}

export default SignIn;