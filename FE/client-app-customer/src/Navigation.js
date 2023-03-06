import * as React from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useScrollTrigger, Stack, Box, Paper, Avatar } from '@mui/material/';
import { BottomNavigation, BottomNavigationAction, AppBar,Toolbar } from '@mui/material/';
import { pink } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import GlobalWhiteHeader6 from './global/typographies/headers/WhiteHeader6';
import GlobalPinkBadge from './global/badges/PinkBadge';

import store from './store/store';

function ElevationScroll(props) {

    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Navigation(props) {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const table_number = store((state) => state.table_number); 

    const navigation = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    };

    const avatar = {
        bgcolor: pink[400]
    };

    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <Box>
                                <Avatar sx={avatar} />
                            </Box>
                            <Box>
                                <GlobalWhiteHeader6 text={`Table ${table_number}`} />
                            </Box>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Outlet/>
            <Paper sx={navigation} elevation={10}>
                <BottomNavigation showLabels value={value} onChange={(event, value) => setValue(value)} >
                    <BottomNavigationAction onClick={() => navigate('/')} label='Menu' value='menu' icon={<AssignmentIcon />} />
                    <BottomNavigationAction onClick={() => navigate('/cart')} label='Cart' value='cart' icon={<GlobalPinkBadge badgeContent='10' max='9' overlap='circular'><ShoppingCartIcon /> </GlobalPinkBadge>} />
                    <BottomNavigationAction onClick={() => navigate('/pending')} label='Pending' value='pending' icon={<GlobalPinkBadge badgeContent='10' max='9' overlap='circular'><PendingActionsIcon /></GlobalPinkBadge>} />
                    <BottomNavigationAction onClick={() => navigate('/payment')} label='Payment' value='payment' icon={<PaymentIcon />} />
                </BottomNavigation>
            </Paper>
        </React.Fragment>
    );
}