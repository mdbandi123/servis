import React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalBlackHeader3 from '../../global/typographies/headers/BlackHeader3';

function Error() {
    const pageContainer = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        width: '100vw'
    };

    const searchIcon = {
        fontSize: '8em',
        color: grey[600],
        mb: 2
    };

    return (
        <React.Fragment>
            <Grid2 container sx={pageContainer} spacing={1}>
                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                    <SearchIcon sx={searchIcon} />
                    <GlobalBlackHeader3 text='404 Error' />
                    <GlobalGreyBody2 text={`Sorry, page not found.`} />
                </Grid2>
            </Grid2>
        </React.Fragment>
    );
}

export default Error;