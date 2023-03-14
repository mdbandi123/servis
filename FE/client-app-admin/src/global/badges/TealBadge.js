import * as React from 'react';

import { grey, teal } from '@mui/material/colors';
import { Badge } from '@mui/material';

const badgeStyle = {
    '& .MuiBadge-badge': {
        color: grey[50],
        backgroundColor: teal[400]
    }
};

function GlobalTealBadge(props) {
    return (
        <Badge 
            sx={ badgeStyle }
            badgeContent={ props.badgeContent }
            max={ props.max }
            variant={ props.variant }
            overlap={ props.overlap }
            >
            { props.children }
        </Badge>
    );
};

export default GlobalTealBadge;