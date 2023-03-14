import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';

const CustomTypographyHeader4 = styled(Typography)(({ theme }) => ({
    color: indigo[900],
    fontSize: '1.2em'
}));

function GlobalIndigoHeader6(props) {
    return (
        <CustomTypographyHeader4 variant='h6'>{props.text}</CustomTypographyHeader4>
    );
};

export default GlobalIndigoHeader6;