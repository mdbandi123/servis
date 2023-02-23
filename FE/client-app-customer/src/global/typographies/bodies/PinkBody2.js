import * as React from 'react';

import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyBody2 = styled(Typography)(({ theme }) => ({
    color: pink[500],
}));

function GlobalPinkBody2(props) {
    return (
        <CustomTypographyBody2 variant='body2' sx={props.sx}>{props.text}</CustomTypographyBody2>
    );
};

export default GlobalPinkBody2;