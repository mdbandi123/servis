import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';

import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalOrangeHeader6 from '../../global/typographies/headers/OrangeHeader6';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalTealContainedButton from '../../global/buttons/contains/TealContainedButton';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import FadeIn from '../../global/animation/FadeIn';

function CategoryList() {
    const navigate = useNavigate();
    const { category_name } = useParams();
    const [StartersData, setStartersData] = React.useState([]);

    const { order_id } = useStore();

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu_items/items/${category_name}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // console.log(data.items);
                    setStartersData(data.items);
                } else {
                    console.log(data.error);
                }
            }
            ).catch((error) => {
                console.log(error);
            });
    }, [])

    const addToCart = (item_id) => {
        console.log(item_id);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/item/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_id: item_id,
                quantity: 1,
                order_id: order_id
            })
        }).then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.message);
                } else {
                    console.log(data.error);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

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

    const addBtn = {
        width: '100%'
    };

    const categoryNamePriceContainer = {
        height: 90
    };

    if (StartersData.length === 0) {
        return (
            <FadeIn>
                <Box sx={pageContainer}>
                    <Stack sx={headerPage} direction='row' alignItems='center' alignContent='center' spacing={1}>
                        <IconButton onClick={() => navigate('/')}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                        <GlobalBlackHeader4 text={category_name} />
                    </Stack>
                    <Grid2 container sx={centerAlignment} spacing={1}>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ExtensionOffIcon sx={noItemIcon} />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalBlackHeader5 text={`No ${category_name} Found`} />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalGreyBody2 text={`We couldn't find any ${category_name}. Admin might not have created yet.`} />
                        </Grid2>
                    </Grid2>
                </Box>
            </FadeIn>
        );
    };

    return (
        <FadeIn>
            <Box sx={pageContainer}>
                <Stack sx={headerPage} direction='row' alignItems='center' alignContent='center' spacing={1}>
                    <IconButton onClick={() => navigate('/')}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <GlobalBlackHeader4 text={category_name} />
                </Stack>
                <Grid2 container justifyContent='start'>
                    <Grid2 item>
                        <Grid2 container justifyContent='start' spacing={1}>
                            {StartersData.map((startersList) => (
                                <Grid2 item xs={6} sm={6} md={4} lg={3} lx={3}>
                                    <Card sx={cardContainer}>
                                        <CardMedia component='img' height='140' image={`${process.env.REACT_APP_BACKEND_URL}${startersList.image}`} alt={startersList.name} />
                                        <CardContent sx={cardContent}>
                                            <Stack direction='column' spacing={2}>
                                                <Box sx={categoryNamePriceContainer}>
                                                    <GlobalBlackHeader6 sx={itemNamePrice} text={startersList.name} />
                                                    <GlobalOrangeHeader6 sx={itemNamePrice} text={'₱' + startersList.price.$numberDecimal} />
                                                </Box>
                                                <Box >
                                                    <GlobalTealContainedButton text='Add to cart' sx={addBtn} startIcon={<AddRoundedIcon />} onClick={() => addToCart(startersList._id)} />
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
        </FadeIn>
    );
}

export default CategoryList;