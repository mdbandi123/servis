import * as React from 'react';

import { styled } from '@mui/material/styles';
import { grey, teal } from '@mui/material/colors';
import { Badge } from '@mui/material';

const BadgeColor = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        color: grey[50],
        backgroundColor: teal[400],
    }
}));

function GlobalPinkBadge(props) {
    return (
        <BadgeColor sx={props.sx} badgeContent={props.badgeContent} overlap={props.overlap} max={props.max} variant={props.variant} >{props.children}</BadgeColor>
    );
};

export default GlobalPinkBadge;