import * as React from 'react';

import { grey, pink } from '@mui/material/colors';
import { Badge } from '@mui/material';

const badgeStyle = {
    '& .MuiBadge-badge': {
        color: grey[50],
        backgroundColor: pink[500]
    }
};

function GlobalPinkBadge(props) {
    return (
        <Badge sx={[badgeStyle]} badgeContent={props.badgeContent} overlap={props.overlap} max={props.max} variant={props.variant} >{props.children}</Badge>
    );
};

export default GlobalPinkBadge;