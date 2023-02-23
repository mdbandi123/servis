import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const CustomTypographyHeader6 = styled(Typography)(({ theme }) => ({
    color: blue[900],
    fontSize: '1.2em'
}));

function GlobalBlueHeader6(props) {
    return (
        <CustomTypographyHeader6 variant='h6'>{props.text}</CustomTypographyHeader6>
    );
};

export default GlobalBlueHeader6;