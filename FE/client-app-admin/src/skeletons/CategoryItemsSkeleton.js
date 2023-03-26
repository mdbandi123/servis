import React from 'react';

import { grey } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Skeleton } from '@mui/material';

function CategorySkeleton() {
    const skeleton = {
        container: {
            mb: 4
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
            {Array.from(new Array(8)).map(() => (
                <Grid2 item sx={skeleton.container} xs={12} sm={6} md={4} lg={3} lx={2.4} >
                    <Grid2 container>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={140} animation='wave' />
                        </Grid2>
                        <Grid2 item xs={9} sm={9} md={9} lg={9} lx={9}>
                            <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                        </Grid2>
                        <Grid2 item xs={7} sm={7} md={7} lg={7} lx={7}>
                            <Skeleton sx={skeleton.bgColor} variant='text' animation='wave' />
                        </Grid2>
                    </Grid2>
                </Grid2>
            ))}
        </React.Fragment>
    );
};

export default CategorySkeleton;