import React from 'react';

import { grey } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Skeleton } from '@mui/material';

function PendingSkeleton() {
    const skeleton = {
        table: {
            backgroundColor: grey[400],
        }
    }
    return (
        <React.Fragment>
            {Array.from(new Array(3)).map(() => (
                <Grid2 item xs={12} sm={6} md={6} lg={4} lx={4} justifyContent="space-around">
                    <Grid2 container spacing={1}>
                        <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={125} animation='wave' />
                        </Grid2>
                        <Grid2 item xs={8} sm={8} md={8} lg={8} lx={8}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={125} animation='wave' />
                        </Grid2>
                    </Grid2>
                </Grid2>
            ))}
        </React.Fragment>
    );
};

export default PendingSkeleton;