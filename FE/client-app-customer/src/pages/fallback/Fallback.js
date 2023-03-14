import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { grey } from '@mui/material/colors';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';

import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import FadeIn from '../../global/animation/FadeIn';

function Fallback() {
    const fullScreenDisplay = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
    };

    const sessionExpiredIcon = {
        fontSize: '6em',
        color: grey[600]
    };

    return (
        <FadeIn>
            <Grid2 container sx={[fullScreenDisplay, centerAlignment]}>
                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                    <HourglassDisabledRoundedIcon sx={sessionExpiredIcon} />
                    <GlobalBlackHeader5 text='Your Session is Invalid or Expired' />
                    <GlobalGreyBody2 text={`Try scanning a new QR Code to access again.`} />
                </Grid2>
            </Grid2>
        </FadeIn>
    );
}

export default Fallback;