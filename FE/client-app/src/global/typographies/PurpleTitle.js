import * as React from 'react';

import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyTitle = styled(Typography)(({ theme }) => ({
    color: purple[900],
    fontSize: '2em',
}));

function GlobalPurpleTitle(props) {
    return (
        <CustomTypographyTitle variant='h4'>{props.text}</CustomTypographyTitle>
    );
}

export default GlobalPurpleTitle;