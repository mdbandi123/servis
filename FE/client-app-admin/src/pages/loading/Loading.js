import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material/';
import { orange } from '@mui/material/colors';

function Loading() {
    const backDrop = {
        backgroundColor: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1
    };

    const loadingProgressIcon = {
        color: orange[600]
    };

    return (
        <React.Fragment>
            <Backdrop sx={backDrop} 
            // open={open} 
            >
                <CircularProgress sx={loadingProgressIcon} size='4em' />
            </Backdrop>
        </React.Fragment>
    );
}

export default Loading;