import React from 'react';
import { CartList } from '../cart/data/CartList';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, Stack, Box, CardMedia } from '@mui/material';
import { grey } from '@mui/material/colors';

import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';

import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalPinkBody1 from '../../global/typographies/bodies/PinkBody1';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';

function Pending() {
    const headerPage = {
        pb: 2,
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 1
    };

    const foodImage = {
        width: 90,
        height: 90,
        borderRadius: '50%',
        m: 'auto',
    };

    const pendingStatusText = {
        pr: 1, pl: 1
    };

    const centerAlignment = {
        pt: 3,
        pb: 2,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const noItemIcon = {
        fontSize: '6em',
        color: grey[600]
    };

    if(CartList.length === 0) {
        return (
            <React.Fragment>
                <Box sx={pageContainer}>
                    <Box sx={headerPage}>
                        <GlobalBlackHeader4 text='Pending Orders' />
                    </Box>
                    <Grid2 container sx={centerAlignment} spacing={1}>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ExtensionOffIcon sx={noItemIcon} />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalBlackHeader5 text='No Pending Orders Found' />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalGreyBody2 text={`We couldn't find any Pending Item. Add some item in the menu section or verify the ordered item in your cart.`} />
                        </Grid2>
                    </Grid2>
                </Box>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
             <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Pending Orders' />
                </Box>
                {CartList.map((cartList) => (
                <Card>
                    <Grid2 container spacing={2} >
                        <Grid2 item justifySelf='center' alignSelf='center' xs={4} sm={3} md={2} lg={1} lx={1}>
                            <CardMedia sx={foodImage} component='img' image={cartList.image} alt={cartList.orderName} />
                        </Grid2>
                        <Grid2 item xs={8} sm={9} md={10} lg={11} lx={11} >
                            <Grid2 item>
                                <GlobalBlackHeader6 text={cartList.orderName} />
                                <GlobalGreyBody1 text={cartList.category} />
                                <GlobalPinkBody1 text={'$'+cartList.price} />
                            </Grid2>
                            <Grid2 container direction='row' >
                                <Grid2 item alignSelf='center' xs={5} sm={8} md={9} lg={10} lx={10}>
                                    <GlobalGreyBody2 text='Quantity: 1' />
                                </Grid2>
                                <Grid2 item xs={7} sm={4} md={3} lg={2} lx={2}>
                                    <Stack direction='row' justifyContent='flex-end' alignItems='center'>
                                        <Box>
                                            <GlobalGreyBody2 text={cartList.status} sx={[{ color: cartList.statusColor, border: '1px solid ' + cartList.statusColor }, pendingStatusText ]} />
                                        </Box>
                                    </Stack>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Card>
                ))}
            </Box>
        </React.Fragment>
    );
}

export default Pending;
