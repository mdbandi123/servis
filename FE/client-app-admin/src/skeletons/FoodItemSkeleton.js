import React from 'react';

import { grey } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Skeleton } from '@mui/material';

function FoodSkeleton() {
    const skeleton = {
        container: {
            maxWidth: 350
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
        floatRight: {
            float: 'right'
        }
    };

    return (
        <React.Fragment>
            {Array.from(new Array(8)).map(() => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} lx={2.4}>
                    <Box sx={ skeleton.container }>
                        <Box>
                            <Skeleton sx={[skeleton.bgColor]} variant='rounded' height={159} animation='wave' />
                        </Box>
                        <Box sx={skeleton.mt}>
                            <Skeleton sx={[skeleton.bgColor]} variant='text' width={150} animation='wave' />
                        </Box>
                        <Box>
                            <Skeleton sx={[skeleton.bgColor]} variant='text' width={100} animation='wave' />
                        </Box>
                        <Box>
                            <Skeleton sx={[skeleton.bgColor]} variant='text' width={70} animation='wave' />
                        </Box>
                        <Box sx={skeleton.mt}>
                            <Skeleton sx={[skeleton.floatRight, skeleton.bgColor]} variant='circular' width={25} height={25} animation='wave' />
                            <Skeleton sx={[skeleton.floatRight, skeleton.bgColor, skeleton.mr]} variant='circular' width={25} height={25} animation='wave' />
                        </Box>
                    </Box>
                </Grid2>
            ))}
        </React.Fragment>
    );
};

export default FoodSkeleton;