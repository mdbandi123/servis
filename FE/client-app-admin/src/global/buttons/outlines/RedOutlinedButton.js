import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
    color: red[700],
}));

function GlobalRedOutlinedButton(props) {
    return (
        <CustomOutlinedButton 
            variant='outlined' 
            onClick={ props.onClick }
            >
            { props.text }
        </CustomOutlinedButton>
    );
};

export default GlobalRedOutlinedButton;