import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyOverline = styled(Typography)(({ theme }) => ({
    color: grey[900]
}))

function GlobalBlackOverline(props) {
    return (
        <CustomTypographyOverline variant='overline'>{props.text}</CustomTypographyOverline>
    )
}

export default GlobalBlackOverline;