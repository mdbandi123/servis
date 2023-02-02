import * as React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: blue[800],
    '&:hover': {
        backgroundColor: blue[900],
        transition: '0.5s',
    },
}));

function GlobalBlueContainedButton(props) {
    return (
        <ColorButton variant='contained'>{props.text}</ColorButton>
    );
}

export default GlobalBlueContainedButton;