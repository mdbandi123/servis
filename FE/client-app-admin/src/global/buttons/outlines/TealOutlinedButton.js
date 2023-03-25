import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { teal } from '@mui/material/colors';

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
    color: teal[400],
    border: '1px solid' + teal[400],
    '&:hover': {
        color: teal[500],
        border: '1px solid' + teal[500],
        transition: '0.5s'
    }
}));

function GlobalTealOutlinedButton(props) {
    return (
        <CustomOutlinedButton 
            variant='outlined' 
            onClick={ props.onClick } 
            >
            { props.text }
        </CustomOutlinedButton>
    );
};

export default GlobalTealOutlinedButton;