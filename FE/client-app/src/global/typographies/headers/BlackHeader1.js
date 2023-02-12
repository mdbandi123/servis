import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

const CustomTypographyHeader1 = styled(Typography)(({ theme }) => ({
    color: grey[900],
}));

function GlobalBlackHeader1(props) {
    return (
        <CustomTypographyHeader1 variant='h1'>{props.text}</CustomTypographyHeader1>
    );
}

export default GlobalBlackHeader1;