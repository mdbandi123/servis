import React from 'react';
import store from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import FadeIn from '../../global/animation/FadeIn';

function Menu() {
    const { setCategoryItems } = store.getState();
    const CategoryData = store((state) => state.CategoryData);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCategoryItems(data.categories);
            })
            .catch((error) => console.error(error));
    }, []);
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
        minWidth: 160
    };

    const cardContent = {
        textAlign: 'center'
    };

    const itemName = {
        fontSize: '1.5em'
    }

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

    const uploadImageIcon = {
        fontSize: '8em',
        color: grey[600],
        display: 'flex',
    };

    if (CategoryData.length === 0) {
        return (
            <FadeIn>
                <Box sx={pageContainer}>
                    <Grid2 container sx={centerAlignment} spacing={1}>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ExtensionOffIcon sx={noItemIcon} />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalBlackHeader5 text='No Category Found' />
                        </Grid2>
                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <GlobalGreyBody2 text={`We couldn't find any Category. Admin might not have created Category yet.`} />
                        </Grid2>
                    </Grid2>
                </Box>
            </FadeIn>
        );
    };

    return (
        <FadeIn>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Categories' />
                </Box>
                <Grid2 container justifyContent='center'>
                    <Grid2 item>
                        <Grid2 container justifyContent='start' spacing={1}>
                            {CategoryData.map((categoryList) => (
                                <Grid2 item xs={6} sm={6} md={4} lg={3} lx={3}>
                                    <Card sx={cardContainer}>
                                        <CardActionArea onClick={() => navigate(`/menu/${categoryList.category_name}`)}>
                                            <CardMedia 
                                                component='img' height='140' 
                                                image={`${process.env.REACT_APP_BACKEND_URL}${categoryList.category_image}`} 
                                                alt={categoryList.category_name} 
                                            />
                                            <CardContent sx={cardContent}>
                                                <GlobalBlackHeader6 sx={itemName} text={categoryList.category_name} />
                                            </CardContent>
                                        </CardActionArea>
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

export default Menu;