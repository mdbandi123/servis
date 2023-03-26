import React from 'react';

import { grey } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Skeleton } from '@mui/material';

function TableMngmntSkeleton() {
    const skeleton = {
        table: {
            m: 1,
            backgroundColor: grey[400],
            height: 96.5
        }
    }
    return (
        <React.Fragment>
            {Array.from(new Array(12)).map(() => (
                <Grid2 item xs={12} sm={12} md={6} lg={4} lx={4}>
                    <Skeleton variant='rounded' sx={skeleton.table} animation='wave' />
                </Grid2>
            ))}
        </React.Fragment>
    );
};

export default TableMngmntSkeleton;