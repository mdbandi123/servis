import * as React from 'react';

import { grey, teal } from '@mui/material/colors';
import { Badge } from '@mui/material';

const badgeStyle = {
    '& .MuiBadge-badge': {
        color: grey[50],
        backgroundColor: teal[400]
    }
};

function GlobalPinkBadge(props) {
    return (
        <Badge sx={badgeStyle} badgeContent={props.badgeContent} max={props.max} variant={props.variant} >{props.children}</Badge>
    );
};

export default GlobalPinkBadge;