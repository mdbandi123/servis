import * as React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: teal[400],
    '&:hover': {
        backgroundColor: teal[500],
        transition: '0.5s'
    }
}));

function GlobalTealContainedButton(props) {
    return (
        <ColorButton variant='contained' onClick={props.onClick} sx={props.sx} disabled={props.disabled}>{props.text}</ColorButton>
    );
};

export default GlobalTealContainedButton;