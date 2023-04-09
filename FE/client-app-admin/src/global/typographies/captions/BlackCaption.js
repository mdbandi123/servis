import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyCaption = styled(Typography)(({ theme }) => ({
    color: grey[900]
}));

function GlobalBlackCaption(props) {
    return (
        <CustomTypographyCaption variant='caption'>{props.text}</CustomTypographyCaption>
    );
};

export default GlobalBlackCaption;