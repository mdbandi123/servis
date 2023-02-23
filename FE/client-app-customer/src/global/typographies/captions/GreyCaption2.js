import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyCaption2 = styled(Typography)(({ theme }) => ({
    color: grey[600],
    fontSize: '0.7em'
}));

function GlobalGreyCaption2(props) {
    return (
        <CustomTypographyCaption2 variant='caption'>{props.text}</CustomTypographyCaption2>
    );
};

export default GlobalGreyCaption2;