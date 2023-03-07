import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';

import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';

function Fallback() {
    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 2,
    };

    const centerAlignment = {
        pt: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const sessionExpiredIcon = {
        fontSize: '6em',
        color: grey[600]
    };

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Grid2 container sx={centerAlignment} spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <HourglassDisabledRoundedIcon sx={sessionExpiredIcon} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader5 text='Your Session is Invalid or Expired' />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2 text={`Try scanning a new QR Code to access again.`} />
                    </Grid2>
                </Grid2>
            </Box>
        </React.Fragment>
    );
}

export default Fallback;