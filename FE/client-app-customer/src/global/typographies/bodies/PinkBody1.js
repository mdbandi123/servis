import * as React from 'react';

import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyBody1 = styled(Typography)(({ theme }) => ({
    color: pink[500]
}));

function GlobalPinkBody1(props) {
    return (
        <CustomTypographyBody1 variant='body1'>{props.text}</CustomTypographyBody1>
    );
};

export default GlobalPinkBody1;