import React from 'react';

import { grey } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Skeleton } from '@mui/material';

function PaymentSkeleton() {
    const skeleton = {
        bgColor: {
            backgroundColor: grey[400],
        },
        mt: {
            mt: 1
        },
        mb: {
            mb: 3
        },
    };

    return (
        <React.Fragment>
            {Array.from(new Array(9)).map(() => (
                <Grid2 item xs={12} sm={6} md={6} lg={4} lx={4} justifyContent="space-around">
                    <Grid2 container>
                        <Grid2 item xs={3} sm={3} md={3} lg={3} lx={3}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={60} animation='wave' />
                        </Grid2>
                        <Grid2 item xs={9} sm={9} md={9} lg={9} lx={9}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={60} animation='wave' />
                        </Grid2>
                        {Array.from(new Array(3)).map(() => (
                            <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4}>
                                <Skeleton sx={skeleton.bgColor} variant='rounded' height={15} animation='wave' />
                                <Skeleton sx={[skeleton.bgColor, skeleton.mt]} variant='rounded' height={30} animation='wave' />
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
            ))}
        </React.Fragment>
    );
};

export default PaymentSkeleton;