import React from 'react';
import { CartList } from './data/CartList';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, CardMedia, IconButton, Stack, Box } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';

import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalPinkHeader6 from '../../global/typographies/headers/PinkHeader6';
import ConfirmOrderModal from '../../global/modals/ConfirmOrderModal';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';

function Cart() {
    const [counter, setCounter] = React.useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);

    if (counter <= 1) {
        decrementCounter = () => setCounter(1);
    }

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

    const quantityBtn = {
        border: '1.5px solid' + blue[600],
        borderRadius: '50%',
        color: blue[600]
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
            <React.Fragment>
                <Box sx={pageContainer}>
                    <Box sx={headerPage}>
                        <GlobalBlackHeader4 text='Food Cart' />
                    </Box>
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
                    <Card sx={totalContainer} space={1}>
                        <Box>
                            <GlobalBlackHeader6 sx={totalMessage} text='Total:' />
                            <GlobalPinkHeader6 sx={totalAmount} text='$0' />
                        </Box>
                    </Card>
                    <Grid2 container sx={confirmContainer} justifyContent='center'>
                        <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ConfirmOrderModal sx={confirmBtn} text='Confirm' variant='contained' context={'Are you sure do you want to proceed your orders?'} disabled={true} />
                        </Grid2>
                    </Grid2>
                </Box>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Food Cart' />
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
                            </Grid2>
                            <Grid2 container direction='row' >
                                <Grid2 item alignSelf='center' xs={5} sm={8} md={9} lg={10} lx={10}>
                                    <GlobalPinkHeader6 text={'$'+cartList.price} />
                                </Grid2>
                                <Grid2 item xs={7} sm={4} md={3} lg={2} lx={2}>
                                    <Stack direction='row' justifyContent='center' alignItems='center'>
                                        <Box>
                                            <IconButton>
                                                <RemoveRoundedIcon sx={quantityBtn}  onClick={decrementCounter}/>
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <GlobalBlackBody1 sx={quantityText} text={counter} />
                                        </Box>
                                        <Box>
                                            <IconButton>
                                                <AddRoundedIcon sx={quantityBtn} onClick={incrementCounter} />
                                            </IconButton>
                                        </Box>
                                    </Stack>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Card>
                ))}
                <Card sx={ totalContainer } space={1}>
                    <Box>
                        <GlobalBlackHeader6 sx={ totalMessage } text='Total:' />
                        <GlobalPinkHeader6 sx={ totalAmount } text='$1323' />
                    </Box>
                </Card>
                <Grid2 container sx={ confirmContainer } justifyContent='center'>
                    <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <ConfirmOrderModal sx={confirmBtn} text='Confirm' variant='contained' context={'Are you sure do you want to proceed your orders?'} disabled={false} />
                    </Grid2>
                </Grid2>
            </Box>
        </React.Fragment>
    );
}

export default Cart;