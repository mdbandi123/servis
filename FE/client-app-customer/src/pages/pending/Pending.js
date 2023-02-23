import React from 'react';
import { CartList } from '../cart/data/CartList';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, CardMedia, Avatar, Stack, Box } from '@mui/material';
import { green, red, pink, blue } from '@mui/material/colors';

import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalGreyCaption2 from '../../global/typographies/captions/GreyCaption2';
import GlobalPinkBody2 from '../../global/typographies/bodies/PinkBody2';

function Pending() {
    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 1
    };

    const foodImage = {
        width: 80,
        height: 100,
        p: 1
    };

    const foodContent = {
        ml: 1.4
    };

    const foodName = {
        fontSize: '1.1em'
    };

    const foodStatus = {
        ml: 1.4,
        color: blue[900]
    };

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                {CartList.map((cartList) => (
                    <Card>
                        <Grid2 container spacing={1} alignItems="center">
                            <Grid2 item>
                                <CardMedia sx={foodImage} component="img" image='https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=' alt="Live from space album cover" />
                            </Grid2>
                            <Grid2 item>
                                <Stack sx={foodContent} direction='row' alignItems="center" spacing={1}>
                                    <GlobalBlackHeader6 sx={foodName} text={cartList.orderName} />
                                    <GlobalGreyCaption2 text={'(' + cartList.category + ')'} />
                                    <Avatar sx={{ bgcolor: pink[500], width: 20, height: 20, fontSize: '1em' }}>{cartList.quantity}</Avatar>
                                </Stack>
                                <Stack direction='column' spacing={2}>
                                    <GlobalPinkBody2 sx={foodContent} text={'$' + cartList.price} />   
                                </Stack>
                                <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
                                    <GlobalPinkBody2 sx={foodStatus} text={cartList.status} />
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Card>
                ))}
            </Box>
        </React.Fragment>
    );
}

export default Pending;
