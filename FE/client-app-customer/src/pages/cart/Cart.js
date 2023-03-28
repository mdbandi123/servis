import React from 'react';
import store from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, CardMedia, IconButton, Stack, Box } from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalOrangeHeader6 from '../../global/typographies/headers/OrangeHeader6';
import ConfirmOrderModal from '../../global/modals/ConfirmOrderModal';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import FadeIn from '../../global/animation/FadeIn';

import CartSkeleton from '../../skeletons/CartSkeleton';

function Cart() {
    const [loading, setLoading] = React.useState(true);
    const { setCartItems } = store.getState();
    const cartItems = store((state) => state.cartItems);
    const CartList = cartItems || [];
    const order_id = store((state) => state.order_id);

    console.log("cartItems", cartItems);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/cart/${order_id || localStorage.getItem("order_id")}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // setTimeout(() => {
                //     setLoading(false)
                // }, 3000);
                setCartItems(data.items);
                setLoading(false);
            }
            ).catch((error) => {
                console.log(error);
            });
    }, []);

    const incrementHandler = (item_id, current_quantity) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/quantity/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: order_id || localStorage.getItem("order_id"),
                    quantity: current_quantity + 1,
                    item_id: item_id
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.items);
                } else {
                    console.log(data.error);
                }
            }
            ).catch((error) => {
                console.log(error);
            });
    };

    const decrementHandler = (item_id, current_quantity) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/quantity/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: order_id || localStorage.getItem("order_id"),
                    quantity: current_quantity - 1,
                    item_id: item_id
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.items);
                } else {
                    console.log(data.error);
                }
            }
            ).catch((error) => {
                console.log(error);
            });
    };


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

    const quantityBtn = {
        border: '1.5px solid' + teal[500],
        borderRadius: '50%',
        color: teal[500]
    };

    const quantityText = {
        pr: 1,
        pl: 1
    };

    const confirmContainer = {
        mt: 0.5
    }

    const confirmBtn = {
        width: '100%'
    };

    const totalContainer = {
        mt: 0.5,
        mb: 1,
        p: 1
    };

    const totalMessage = {
        display: 'inline'
    };

    const totalAmount = {
        float: 'right',
        fontWeight: 'bold'
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

    if (CartList.length === 0) {
        return (
            <FadeIn>
                <Box sx={pageContainer}>
                    <Box sx={headerPage}>
                        <GlobalBlackHeader4 text='Food Cart' />
                    </Box>
                    {
                        loading ? (
                            <CartSkeleton />
                        ) : (
                            <Grid2 container sx={centerAlignment} spacing={1}>
                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <ExtensionOffIcon sx={noItemIcon} />
                                </Grid2>
                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <GlobalBlackHeader5 text='No Item Found' />
                                </Grid2>
                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <GlobalGreyBody2 text={`We couldn't find any Item. Add some item in the menu section.`} />
                                </Grid2>
                            </Grid2>
                        )
                    } 
                    <Card sx={totalContainer} space={1}>
                        <Box>
                            <GlobalBlackHeader6 sx={totalMessage} text='Total:' />
                            <GlobalOrangeHeader6 sx={totalAmount} text='₱0' />
                        </Box >
                    </Card >
                    <Grid2 container sx={confirmContainer} justifyContent='center'>
                        <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ConfirmOrderModal sx={confirmBtn} text='Confirm' variant='contained' context={'Are you sure do you want to proceed your orders?'} disabled={true} />
                        </Grid2>
                    </Grid2>
                </Box >
            </FadeIn >
        );
    };

    return (
        <FadeIn>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Food Cart' />
                </Box>
                {
                    loading ? (
                        <CartSkeleton />
                    ) : (
                        <>
                            {CartList.map((cartList) => (
                                <Card>
                                    <Grid2 container spacing={2} >
                                        <Grid2 item justifySelf='center' alignSelf='center' xs={4} sm={3} md={2} lg={1} lx={1}>
                                            <CardMedia 
                                                sx={foodImage} component='img' 
                                                image={`${process.env.REACT_APP_BACKEND_URL}${cartList.item_image}`}
                                                alt={cartList.item_name} 
                                            />
                                        </Grid2>
                                        <Grid2 item xs={8} sm={9} md={10} lg={11} lx={11} >
                                            <Grid2 item>
                                                <GlobalBlackHeader6 text={cartList.item_name} />
                                                <GlobalGreyBody1 text={cartList.item_category} />
                                            </Grid2>
                                            <Grid2 container direction='row' >
                                                <Grid2 item alignSelf='center' xs={5} sm={8} md={9} lg={10} lx={10}>
                                                    <GlobalOrangeHeader6 text={'₱' + cartList.item_price.$numberDecimal} />
                                                </Grid2>
                                                <Grid2 item xs={7} sm={4} md={3} lg={2} lx={2}>
                                                    <Stack direction='row' justifyContent='center' alignItems='center'>
                                                        <Box>
                                                            <IconButton>
                                                                <RemoveRoundedIcon sx={quantityBtn} onClick={() => decrementHandler(cartList._id, cartList.quantity)} />
                                                            </IconButton>
                                                        </Box>
                                                        <Box>
                                                            <GlobalBlackBody1 sx={quantityText} text={cartList.quantity} />
                                                        </Box>
                                                        <Box>
                                                            <IconButton>
                                                                <AddRoundedIcon sx={quantityBtn} onClick={() => incrementHandler(cartList._id, cartList.quantity)} />
                                                            </IconButton>
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
                {
                    loading ? (
                        <>
                            <Card sx={totalContainer} space={1}>
                                <Box>
                                    <GlobalBlackHeader6 sx={totalMessage} text='Total:' />
                                    <GlobalOrangeHeader6 sx={totalAmount} text='₱0' />
                                </Box >
                            </Card >
                            <Grid2 container sx={confirmContainer} justifyContent='center'>
                                <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <ConfirmOrderModal sx={confirmBtn} text='Confirm' variant='contained' context={'Are you sure do you want to proceed your orders?'} disabled={true} />
                                </Grid2>
                            </Grid2>
                        </>
                    ) : (
                        <>
                            <Card sx={totalContainer} space={1}>
                                <Box>
                                    <GlobalBlackHeader6 sx={totalMessage} text='Total:' />
                                    <GlobalOrangeHeader6 sx={totalAmount} text={
                                        '₱' + CartList.reduce((acc, item) => acc + (item.item_price.$numberDecimal * item.quantity), 0).toFixed(2)
                                    } />
                                </Box>
                            </Card>
                            <Grid2 container sx={confirmContainer} justifyContent='center'>
                                <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <ConfirmOrderModal order_id={order_id} sx={confirmBtn} text='Confirm' variant='contained' context={'Are you sure do you want to proceed your orders?'} disabled={false} />
                                </Grid2>
                            </Grid2>
                        </>
                    )
                } 
            </Box>
        </FadeIn>
    );
}

export default Cart;