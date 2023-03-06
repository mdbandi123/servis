import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';

function Error() {
    const pageContainer = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '80vh',
        width: '100vw',
    };


    const searchIcon = {
        fontSize: '6em',
        color: grey[600]
    };

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Grid2 container spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <SearchIcon sx={searchIcon} />
                        <GlobalBlackHeader5 text='404 Error' />
                        <GlobalGreyBody2 text={`Sorry, page not found.`} />
                    </Grid2>
                </Grid2>
            </Box>
        </React.Fragment>
    );
}

export default Error;