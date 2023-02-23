import React from 'react';
import { CategoryData } from './Category';
import { Box } from '@mui/material';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Menu() {
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

    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Category' />
                </Box>
                <Grid2 container justifyContent='center'>
                    <Grid2 item>
                        <Grid2 container justifyContent='start' spacing={1}>
                            {CategoryData.map((categoryList) => (
                                <Grid2 item xs={6} sm={6} md={4} lg={3} lx={3}>
                                    <Card sx={cardContainer}>
                                        <CardActionArea onClick={() => navigate(categoryList.categPath)}>
                                            <CardMedia component="img" height="140" image={categoryList.categItemImage} alt={categoryList.categItemName} />
                                            <CardContent sx={cardContent}>
                                                <GlobalBlackHeader6 sx={itemName} text={categoryList.categItemName} />
                                            </CardContent>
                                        </CardActionArea>
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

export default Menu;