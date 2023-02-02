import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyHeader = styled(Typography)(({ theme }) => ({
    color: grey[50],
    fontSize: '3em',
}));

function GlobalWhiteHeader(props) {
    return (
        <CustomTypographyHeader variant='h1'>{props.text}</CustomTypographyHeader>
    );
}

export default GlobalWhiteHeader;