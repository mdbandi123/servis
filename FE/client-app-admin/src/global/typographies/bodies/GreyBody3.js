import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyBody3 = styled(Typography)(({ theme }) => ({
    color: grey[600],
    fontSize: '0.7em'
}));

function GlobalGreyBody3(props) {
    return (
        <CustomTypographyBody3 variant='body2'>{props.text}</CustomTypographyBody3>
    );
};

export default GlobalGreyBody3;