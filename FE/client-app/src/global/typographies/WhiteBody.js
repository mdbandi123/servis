import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const CustomTypographyBody = styled(Typography)(({ theme }) => ({
    color: grey[50],
    fontSize: '1.2em'
}));

function GlobalWhiteBody(props) {
    return (
        <CustomTypographyBody variant='body1'>{props.text}</CustomTypographyBody>
    );
}

export default GlobalWhiteBody;