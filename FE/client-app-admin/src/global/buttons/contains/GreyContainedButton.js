import * as React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: grey[300],
    color: grey[900],
    '&:hover': {
        backgroundColor: grey[400],
        transition: '0.5s'
    }
}));

function GlobalGreyContainedButton(props) {
    return (
        <ColorButton
            variant='contained'
            onClick={ props.onClick }
            sx={ props.sx }
            disabled={ props.disabled }
            >
            { props.text }
        </ColorButton>
    );
};

export default GlobalGreyContainedButton;