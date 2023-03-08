import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { indigo } from '@mui/material/colors';

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
    color: indigo[700]
}));

function GlobalBlueOutlinedButton(props) {
    return (
        <CustomOutlinedButton variant='outlined' onClick={ props.onClick } >{props.text}</CustomOutlinedButton>
    );
};

export default GlobalBlueOutlinedButton;