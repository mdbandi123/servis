import React from 'react';

import { grey } from '@mui/material/colors';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function PaymentSkeleton() {
    const skeleton = {
        maxWidth: {
            maxWidth: 500
        },
        bgColor: {
            backgroundColor: grey[400],
        },
        striped: {
            '&:nth-of-type(odd)': {
                backgroundColor: grey[200],
            },
        }
    };

    const tableRow = {
        '&:last-child td, &:last-child th': {
            border: 0
        }
    };

    return (
        <React.Fragment>
            {Array.from(new Array(6)).map(() => (
                <>
                    <TableRow sx={tableRow} >
                    <TableCell align='left'>
                        <Grid2 containter>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                            </Grid2>
                        </Grid2>
                    </TableCell>
                    <TableCell align='left'>
                        <Grid2 containter>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                            </Grid2>
                        </Grid2>
                    </TableCell>
                    <TableCell align='left'>
                        <Grid2 containter>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                            </Grid2>
                        </Grid2>
                    </TableCell>
                    <TableCell align='left'>
                        <Grid2 containter>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                            </Grid2>
                        </Grid2>
                    </TableCell>
                </TableRow>
                </>
            ))}
        </React.Fragment>
    );
};

export default PaymentSkeleton;