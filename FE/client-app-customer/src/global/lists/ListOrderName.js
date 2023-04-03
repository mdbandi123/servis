import * as React from 'react';

import { grey } from '@mui/material/colors';
import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Box, Stack } from '@mui/material';

function GlobalOrderList(props) {
    return (
        <React.Fragment>
            <Stack direction='row' spacing={3} sx={{ mt: 0.5 }}>
                <Box>
                    <CircleRoundedIcon sx={{ fontSize: '0.5em', color: grey[900] }} />
                </Box>
                <Box>
                    <GlobalBlackBody1 text={props.orderList} sx={{ fontSize: '0.9em' }} />
                </Box>
            </Stack>
        </React.Fragment>
    );
};

export default GlobalOrderList;