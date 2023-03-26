import React from 'react';

import { grey } from '@mui/material/colors';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function ArchiveSkeleton() {
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

    return (
        <React.Fragment>
                <TableRow sx={skeleton.striped} hover tabIndex={-1}  >
                    <TableCell />
                    <TableCell scope='row' padding='none'>
                        <Grid2 containter>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                            </Grid2>
                        </Grid2>
                    </TableCell>
                    {Array.from(new Array(4)).map(() => (
                        <>
                            <TableCell align='left'>
                                <Grid2 containter>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <Skeleton sx={[skeleton.bgColor]} variant='text' animation='wave' />
                                    </Grid2>
                                </Grid2>
                            </TableCell>
                        </>
                    ))}
                </TableRow>
            
        </React.Fragment>
    );
};

export default ArchiveSkeleton;