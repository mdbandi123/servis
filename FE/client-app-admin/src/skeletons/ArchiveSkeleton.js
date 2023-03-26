import React from 'react';

import { grey } from '@mui/material/colors';
import {Skeleton, TableCell, TableRow } from '@mui/material';

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
                        <Skeleton sx={[skeleton.maxWidth, skeleton.bgColor]} variant='text' animation='wave' />
                    </TableCell>
                    {Array.from(new Array(4)).map(() => (
                        <>
                            <TableCell align='left'>
                                <Skeleton sx={[skeleton.maxWidth, skeleton.bgColor]} variant='text' animation='wave' />
                            </TableCell>
                        </>
                    ))}
                </TableRow>
            
        </React.Fragment>
    );
};

export default ArchiveSkeleton;