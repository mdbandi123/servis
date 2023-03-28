import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, TextField } from '@mui/material/';
import GlobalGreyContainedButton from '../../global/buttons/contains/GreyContainedButton';
import GlobalTealContainedButton from '../../global/buttons/contains/TealContainedButton';
import GlobalIndigoHeader2 from '../../global/typographies/headers/IndigoHeader2';

import { useNavigate } from 'react-router-dom';
import { teal } from '@mui/material/colors';
import FadeIn from '../../animation/FadeIn';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';

function VerifyEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState(false);

    const fullScreenDisplay = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        backgroundColor: teal[500]
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh'
    };

    const verifyEmailContainer = {
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: { xs: '80vh', sm: '80vh', md: '100vh', lg: '100vh', lx: '100vh' }
    };

    const backButton = {
        cursor: 'pointer'
    };

    return (
        <FadeIn>
            <Grid2 sx={[fullScreenDisplay, centerAlignment]} container>
                <Grid2 sx={[verifyEmailContainer]} xs={12} sm={12} md={8} lg={8} lx={8} item>
                    <Stack component='form' spacing={6}>
                        <Stack>
                            <GlobalIndigoHeader2 text='Verify Email' />
                            <GlobalBlackHeader5 text={`Re-enter your email to verify it.`} />
                        </Stack>
                        <Stack spacing={2}>
                            <Box>
                                <TextField id='outlined-textarea' color='warning' type='email' label='Email' placeholder='Enter your Email' variant='filled' fullWidth 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <Stack direction='row' spacing={1} justifyContent='center'>
                                    <Box onClick={() => navigate('/signup')} sx={backButton}>
                                        <GlobalGreyContainedButton text='Back' />
                                    </Box>
                                    <Box>
                                        <GlobalTealContainedButton text='Verify' disabled={!email} />
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </FadeIn>
    );
};

export default VerifyEmail;