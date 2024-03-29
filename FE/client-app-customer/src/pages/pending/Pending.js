import React, { useState } from 'react';
import store from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, Stack, Box, CardMedia } from '@mui/material';
import { grey } from '@mui/material/colors';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalOrangeBody1 from '../../global/typographies/bodies/OrangeBody1';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import FadeIn from '../../global/animation/FadeIn';

import PendingSkeleton from '../../skeletons/PendingSkeleton';

function Pending() {
    const [loading, setLoading] = React.useState(true);
    const order_id = store((state) => state.order_id);
    const { orderedItems, setOrderedItems } = store();

    const pendingItems = orderedItems.filter((item) => item.status !== 'served');

    console.log(orderedItems);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/items/${order_id || localStorage.getItem("order_id")}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.items);
                    // setTimeout(() => {
                    //     setLoading(false)
                    // }, 3000);
                    setOrderedItems(data.items);
                    setLoading(false);
                } else {
                    console.log(data.error);
                }
            }
            ).catch((error) => {
                console.log(error);
            });
    }, []);

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
        width: 115,
        height: 130,
        mr: 0,
        mb: 0,
        mt: 0,
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

    const uploadImageIcon = {
        fontSize: '5em',
        color: grey[600],
    };

    if (pendingItems.length === 0) {
        return (
            <FadeIn>
                <Box sx={pageContainer}>
                    <Box sx={headerPage}>
                        <GlobalBlackHeader4 text='Pending Orders' />
                    </Box>
                    {
                        loading ? (
                            <PendingSkeleton />
                        ) : (
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
                        )
                    } 
                </Box>
            </FadeIn>
        );
    }

    return (
        <FadeIn>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Pending Orders' />
                </Box>
                {
                    loading ? (
                        <PendingSkeleton />
                    ) : (
                        <>
                            {pendingItems.map((cartList) => (
                                <Card>
                                    <Grid2 container spacing={2} >
                                        <Grid2 item justifySelf='center' alignSelf='center' xs={4} sm={3} md={2} lg={1} lx={1}>
                                            <CardMedia 
                                                sx={foodImage} component='img' 
                                                image={`${process.env.REACT_APP_BACKEND_URL}${cartList.item_image}`} 
                                                alt={cartList.orderName} 
                                            />
                                        </Grid2>
                                        <Grid2 item xs={8} sm={9} md={10} lg={11} lx={11} >
                                            <Grid2 item>
                                                <GlobalBlackHeader6 text={cartList.item_name} />
                                                <GlobalGreyBody1 text={cartList.item_category} />
                                                <GlobalOrangeBody1 text={'₱' + cartList.item_price.$numberDecimal} />
                                            </Grid2>
                                            <Grid2 container direction='row' >
                                                <Grid2 item alignSelf='center' xs={5} sm={8} md={9} lg={10} lx={10}>
                                                    <GlobalGreyBody2 text={`Quantity: ${cartList.quantity}`} />
                                                </Grid2>
                                                <Grid2 item xs={7} sm={4} md={3} lg={2} lx={2}>
                                                    <Stack direction='row' justifyContent='flex-end' alignItems='center'>
                                                        <Box>
                                                            <GlobalGreyBody2 text={cartList.status} sx={[{ border: '1px solid ', color: cartList.status === 'pending' ? 'red' : 'orange' }, pendingStatusText]} />
                                                        </Box>
                                                    </Stack>
                                                </Grid2>
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                </Card>
                            ))}
                        </>
                    )
                } 
            </Box>
        </FadeIn>
    );
}

export default Pending;
