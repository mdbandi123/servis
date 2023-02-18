import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyBody2 = styled(Typography)(({ theme }) => ({
    color: grey[600]
}));

function GlobalGreyBody2(props) {
    return (
        <CustomTypographyBody2 variant='body2'>{props.text}</CustomTypographyBody2>
    );
};

export default GlobalGreyBody2;