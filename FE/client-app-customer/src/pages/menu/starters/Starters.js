import React from 'react';
import { StartersData } from './StartersList';
import { Box, Stack } from '@mui/material';
import GlobalBlackHeader6 from '../../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader4 from '../../../global/typographies/headers/BlackHeader4';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material';
import GlobalBlueContainedButton from '../../../global/buttons/contains/BlueContainedButton';
import GlobalPinkHeader6 from '../../../global/typographies/headers/PinkHeader6 ';

function Starter() {
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
    };

    const cardContent = {
        textAlign: 'center'
    };

    const itemNamePrice = {
        fontSize: '1.1em'
    }

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Stack sx={headerPage} direction='row' alignItems='center' alignContent='center' spacing={1}>
                    <IconButton onClick={() => navigate('/')}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <GlobalBlackHeader4 text='Starters' />
                </Stack>
                <Grid2 container justifyContent='center'>
                    <Grid2 item>
                        <Grid2 container justifyContent='start' spacing={1}>
                            {StartersData.map((startersList) => (
                                <Grid2 item xs={6} sm={6} md={4} lg={3} lx={3}>
                                    <Card sx={cardContainer}>
                                        <CardMedia component="img" height="140" image={startersList.foodItemImage} alt={startersList.foodItemName} />
                                        <CardContent sx={cardContent}>
                                            <Stack direction='column' spacing={2}>
                                                <Box>
                                                    <GlobalBlackHeader6 sx={itemNamePrice} text={startersList.foodItemName} />
                                                    <GlobalPinkHeader6 sx={itemNamePrice} text={startersList.foodItemPrice} />
                                                </Box>
                                                <Box>
                                                    <GlobalBlueContainedButton text='Add' startIcon={<AddIcon />}/>
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

export default Starter;