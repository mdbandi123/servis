import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyBody = styled(Typography)(({ theme }) => ({
    color: grey[900],
    fontSize: '1.2em'
}));

function GlobalBlackBody(props) {
    return (
        <CustomTypographyBody variant='body1'>{props.text}</CustomTypographyBody>
    );
}

export default GlobalBlackBody;