import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';

const CustomTypographyHeader4 = styled(Typography)(({ theme }) => ({
    color: purple[900]
}));

function GlobalPurpleHeader4(props) {
    return (
        <CustomTypographyHeader4 variant='h4'>{props.text}</CustomTypographyHeader4>
    );
};

export default GlobalPurpleHeader4;