import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';

const CustomTypographyHeader6 = styled(Typography)(({ theme }) => ({
    color: pink[500],
    fontSize: '1.2em'
}));

function GlobalPinkHeader6(props) {
    return (
        <CustomTypographyHeader6 variant='h6'>{props.text}</CustomTypographyHeader6>
    );
};

export default GlobalPinkHeader6;