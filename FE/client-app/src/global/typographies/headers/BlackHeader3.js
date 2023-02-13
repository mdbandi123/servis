import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

const CustomTypographyHeader3 = styled(Typography)(({ theme }) => ({
    color: grey[900],
}));

function GlobalBlackHeader3(props) {
    return (
        <CustomTypographyHeader3 variant='h3'>{props.text}</CustomTypographyHeader3>
    );
}

export default GlobalBlackHeader3;