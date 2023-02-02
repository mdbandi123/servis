import * as React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: purple[900],
    backgroundColor: grey[50],
    '&:hover': {
        backgroundColor: grey[300],
        transition: '0.5s',
    },
}));

function GlobalWhiteContainedButton(props) {
    return (
        <ColorButton variant='contained'>{props.text}</ColorButton>
    );
}

export default GlobalWhiteContainedButton;