import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

const CustomTypographyHeader2 = styled(Typography)(({ theme }) => ({
    color: grey[50],
}));

function GlobalWhiteHeader2(props) {
    return (
        <CustomTypographyHeader2 variant='h2'>{props.text}</CustomTypographyHeader2>
    );
}

export default GlobalWhiteHeader2;