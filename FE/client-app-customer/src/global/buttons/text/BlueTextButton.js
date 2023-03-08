import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { indigo } from '@mui/material/colors';

const CustomTextButton = styled(Button)(({ theme }) => ({
    color: indigo[700]
}));

function GlobalBlueTextButton(props) {
    return (
        <CustomTextButton variant='text' onClick={ props.onClick } >{props.text}</CustomTextButton>
    );
};

export default GlobalBlueTextButton;