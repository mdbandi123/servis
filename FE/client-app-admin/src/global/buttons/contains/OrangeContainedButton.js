import * as React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: orange[600],
    '&:hover': {
        backgroundColor: orange[700],
        transition: '0.5s'
    }
}));

function GlobalOrangeContainedButton(props) {
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

export default GlobalOrangeContainedButton;