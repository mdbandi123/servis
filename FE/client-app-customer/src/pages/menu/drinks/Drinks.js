import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DrinksData } from './DrinksList';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';

import GlobalBlackHeader6 from '../../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader4 from '../../../global/typographies/headers/BlackHeader4';
import GlobalPinkHeader6 from '../../../global/typographies/headers/PinkHeader6';
import GlobalGreyBody2 from '../../../global/typographies/bodies/GreyBody2';
import GlobalBlueContainedButton from '../../../global/buttons/contains/BlueContainedButton';
import GlobalBlackHeader5 from '../../../global/typographies/headers/BlackHeader5';

function Drinks() {
    const navigate = useNavigate();

    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 2,
    };

    const headerPage = {
        pb: 2,
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const cardContainer = {
        minWidth: 160,
        maxWidth: { xs: 250, sm: 260, md: 270, lg: 280, lx: 300 }
    };

    const cardContent = {
        textAlign: 'center'
    };

    const itemNamePrice = {
        fontSize: '1.1em'
    };

    const centerAlignment = {
        pt: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const noItemIcon = {
        fontSize: '6em',
        color: grey[600]
    };

    if (DrinksData.length === 0) {
        return (
            <React.Fragment>
                <Box sx={pageContainer}>
                    <Stack sx={headerPage} direction='row' alignItems='center' alignContent='center' spacing={1}>
                        <IconButton onClick={() => navigate('/')}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                        <GlobalBlackHeader4 text='Drinks' />
                    </Stack>
                    <Grid2 container sx={centerAlignment} spacing={1}>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ExtensionOffIcon sx={noItemIcon} />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalBlackHeader5 text='No Drinks Found' />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalGreyBody2 text={`We couldn't find any Drinks. Admin might not have created yet.`} />
                        </Grid2>
                    </Grid2>
                </Box>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Stack sx={headerPage} direction='row' alignItems='center' alignContent='center' spacing={1}>
                    <IconButton onClick={() => navigate('/')}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <GlobalBlackHeader4 text='Drinks' />
                </Stack>
                <Grid2 container justifyContent='center'>
                    <Grid2 item>
                        <Grid2 container justifyContent='start' spacing={1}>
                            {DrinksData.map((drinksList) => (
                                <Grid2 item xs={6} sm={6} md={4} lg={3} lx={3}>
                                    <Card sx={cardContainer}>
                                        <CardMedia component='img' height='140' image={drinksList.foodItemImage} alt={drinksList.foodItemName} />
                                        <CardContent sx={cardContent}>
                                            <Stack direction='column' spacing={2}>
                                                <Box>
                                                    <GlobalBlackHeader6 sx={itemNamePrice} text={drinksList.foodItemName} />
                                                    <GlobalPinkHeader6 sx={itemNamePrice} text={'$' + drinksList.foodItemPrice} />
                                                </Box>
                                                <Box >
                                                    <GlobalBlueContainedButton text='Add' sx={{ width: '100%' }} startIcon={<AddRoundedIcon />} />
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </React.Fragment>
    );
}

export default Drinks;