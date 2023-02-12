import * as React from 'react';
import { FoodItemData } from './datas/FoodItemData';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CardActions, CardMedia, CardContent, Card } from '@mui/material/';
import FolderOffTwoToneIcon from '@mui/icons-material/FolderOffTwoTone';

import GlobalPurpleHeader4 from '../../../global/typographies/headers/PurpleHeader4';
import GlobalBlackHeader6 from '../../../global/typographies/headers/BlackHeader6';
import GlobalGreyBody2 from '../../../global/typographies/bodies/GreyBody2';
import GlobalPinkHeader6 from '../../../global/typographies/headers/PinkHeader6';
import GlobalBlackHeader3 from '../../../global/typographies/headers/BlackHeader3';
import DeleteItemModal from '../../../global/modals/DeleteItemModal';
import CreateItemModal from '../../../global/modals/CreateItemModal';
import UpdateItemModal from '../../../global/modals/UpdateItemModal';

function FoodItems() {
    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    }
    const foodItemCardContainer = {
        maxWidth: 350,
    }

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }

    const noItemIcon = {
        fontSize: '8em'
    }

    if (FoodItemData.length === 0) {
        return (
            <React.Fragment>
                <Box sx={pageTitleContainer}>
                    <GlobalPurpleHeader4 text="Food Items" />
                </Box>
                <Box mb={3}>
                    <CreateItemModal />
                </Box>
                <Grid2 container sx={centerAlignment} spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <FolderOffTwoToneIcon sx={ noItemIcon } />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader3 text="No Food Item Found" />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2 text="We couldn't find any Food Items. Try to create your own Food Item." />
                    </Grid2>
                </Grid2>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text="Food Items" />
            </Box>
            <Box mb={3}>
                <CreateItemModal />
            </Box>
            <Grid2 container spacing={3}>
                {FoodItemData.map((foodItemList) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} lx={2.4}>
                    <Card sx={foodItemCardContainer}>
                        <CardMedia component="img" alt={foodItemList.foodItemName} height="140" image={foodItemList.foodItemImage}/>
                        <CardContent>
                            <GlobalBlackHeader6 text={foodItemList.foodItemName} />
                            <GlobalGreyBody2 text={foodItemList.foodItemCategory} /> 
                            <GlobalPinkHeader6 text={foodItemList.foodItemPrice} />
                        </CardContent>
                        <CardActions>
                                <UpdateItemModal title={'Update ' + foodItemList.foodItemName} image={foodItemList.foodItemImage} alt={foodItemList.foodItemName} valueName={foodItemList.foodItemName} valuePrice={foodItemList.foodItemPrice} valueCateg={foodItemList.foodItemCategory} />
                            <DeleteItemModal context={'If you delete this item will be permanently gone. Are you sure you want to delete ' + foodItemList.foodItemName + '?'}  />
                        </CardActions>
                    </Card>
                </Grid2>
                ))}
            </Grid2>
        </React.Fragment>
    );
}

export default FoodItems;