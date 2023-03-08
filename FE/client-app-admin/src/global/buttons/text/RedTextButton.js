import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const CustomTextButton = styled(Button)(({ theme }) => ({
    color: deepOrange[700]
}));

function GlobalRedTextButton(props) {
    return (
        <CustomTextButton variant='text' onClick={props.onClick}>{props.text}</CustomTextButton>
    );
};

export default GlobalRedTextButton;