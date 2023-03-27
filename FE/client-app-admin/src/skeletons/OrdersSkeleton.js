import React from 'react';

import { grey } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Skeleton } from '@mui/material';

function OrdersSkeleton() {
    const skeleton = {
        container: {
            p: 0,
            minWidth: 250,
            maxWidth: 250,
            flexGrow: 1,
            mr: 1,
            mb: 5
        },
        bgColor: {
            backgroundColor: grey[400],
        },
        mt: {
            mt: 2
        },
        mr: {
            mr: 3
        },
        mb: {
            mb: 1
        },
    };

    return (
        <React.Fragment>
            {Array.from(new Array(12)).map(() => (
                <Grid2 item sx={skeleton.container} xs={12} sm={6} md={6} lg={4} lx={4} >
                    <Grid2 container>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={65} animation='wave' />
                        </Grid2>
                        <Grid2 item xs={6} sm={6} md={6} lg={6} lx={6}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={25} animation='wave' />
                        </Grid2>
                        <Grid2 item xs={6} sm={6} md={6} lg={6} lx={6}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={25} animation='wave' />
                        </Grid2>
                    </Grid2>
                </Grid2>
            ))}
        </React.Fragment>
    );
};

export default OrdersSkeleton;