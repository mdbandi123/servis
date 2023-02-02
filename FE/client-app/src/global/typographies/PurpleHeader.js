import * as React from 'react';

import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyHeader = styled(Typography)(({ theme }) => ({
    color: purple[900],
    fontSize: '3em',
}));

function GlobalPurpleHeader(props) {
    return (
        <CustomTypographyHeader variant='h1'>{props.text}</CustomTypographyHeader>
    );
}

export default GlobalPurpleHeader;