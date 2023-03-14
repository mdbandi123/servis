import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

const CustomTypographyHeader4 = styled(Typography)(({ theme }) => ({
    color: grey[900]
}));

function GlobalBlackHeader4(props) {
    return (
        <CustomTypographyHeader4 variant='h4'>{props.text}</CustomTypographyHeader4>
    );
};

export default GlobalBlackHeader4;