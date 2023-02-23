import React from 'react';
import { CartList } from './data/CartList';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, CardMedia, IconButton, Stack, Box } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalGreyCaption2 from '../../global/typographies/captions/GreyCaption2';
import GlobalPinkBody2 from '../../global/typographies/bodies/PinkBody2';

function Cart() {
    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 1
    }

    const foodImage = {
        width: 80,
        height: 100,
        p: 1 
    }

    const foodContent = {
        ml: 1.4
    }

    const foodName = {
        fontSize: '1.1em'
    }

    const decrementIcon = {
        color: blue[900]
    }

    const incrementIcon = {
        color: blue[900]
    }

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
                            </Stack>
                            <Stack direction='column' spacing={2}>
                                <GlobalPinkBody2 sx={foodContent} text={'$' + cartList.price}  />
                                <Stack direction='row' alignItems="center" >
                                    <IconButton >
                                        <RemoveRoundedIcon sx={decrementIcon} />
                                    </IconButton>
                                    <GlobalBlackBody1  sx={{color: 'black'}} text='2' />
                                    <IconButton >
                                        <AddRoundedIcon sx={incrementIcon}/>
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Card>
                ))}
            </Box>
        </React.Fragment>
    );
}

export default Cart;
