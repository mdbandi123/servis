import * as React from 'react';
import { orange, grey } from '@mui/material/colors';
import { CircularProgress } from '@mui/material/';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import FadeIn from '../../animation/FadeIn';

function Loading() {
    const loadingProgressIcon = {
        color: orange[600]
    };

    const fullScreenDisplay = {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: grey[50]
    };

    const centerAlignment = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100vh",
    };

    return (
        <FadeIn>
            <Grid2 container sx={[fullScreenDisplay, centerAlignment]}>
                <Grid2 item>
                    <CircularProgress sx={loadingProgressIcon} size='4em' />
                </Grid2>
            </Grid2>
        </FadeIn>
    );
}

export default Loading;