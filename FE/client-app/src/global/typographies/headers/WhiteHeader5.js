import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

const CustomTypographyHeader5 = styled(Typography)(({ theme }) => ({
    color: grey[50],
    fontSize: '1.2em'
}));

function GlobalWhiteHeader5(props) {
    return (
        <CustomTypographyHeader5 variant='h5'>{props.text}</CustomTypographyHeader5>
    );
}

export default GlobalWhiteHeader5;