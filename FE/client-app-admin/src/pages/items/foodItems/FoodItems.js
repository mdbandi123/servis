import * as React from 'react';
import { useStore } from '../../../store/store';

import { motion, AnimatePresence } from 'framer-motion';
import { Box, IconButton, Stack, TextField, Tooltip } from '@mui/material/';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CardActions, CardMedia, CardContent, Card } from '@mui/material/';
import { grey, teal } from '@mui/material/colors';
import FolderOffTwoToneIcon from '@mui/icons-material/FolderOffTwoTone';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalIndigoHeader4 from '../../../global/typographies/headers/IndigoHeader4';
import GlobalIndigoHeader6 from '../../../global/typographies/headers/IndigoHeader6';
import GlobalBlackHeader6 from '../../../global/typographies/headers/BlackHeader6';
import GlobalGreyBody2 from '../../../global/typographies/bodies/GreyBody2';
import GlobalBlackHeader3 from '../../../global/typographies/headers/BlackHeader3';
import DeleteItemModal from '../../../global/modals/DeleteItemModal';
import CreateItemModal from '../../../global/modals/CreateItemModal';
import UpdateItemModal from '../../../global/modals/UpdateItemModal';
import SlideDown from '../../../animation/SlideDown';
import GlobalBlackBody1 from '../../../global/typographies/bodies/BlackBody1';

function FoodItems() {
    const { menuItems, setMenuItems } = useStore();
    const [search, setSearch] = React.useState('');

    console.log(menuItems);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu_items/`)
            .then((res) => res.json())
            .then((data) => {
                setMenuItems(data.items);
            });
    }, []);

    const pageTitleContainer = {
        mb: 3,
        textAlign: {
            xs: 'center',
            sm: 'center',
            md: 'left',
            lg: 'left',
            lx: 'left',
        },
    };

    const foodItemCardContainer = {
        maxWidth: 350,
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    };

    const noItemIcon = {
        fontSize: '8em',
    };

    const searchBar = {
        backgroundColor: grey[50]
    };

    const actionIcon = {
        color: teal[400],
        '&:hover': {
            color: teal[500],
            transition: '0.5s'
        }
    };

    const uploadImageIcon = {
        fontSize: '8em',
        color: grey[600]
    };

    if (menuItems.length === 0) {
        return (
            <SlideDown>
                <Box sx={pageTitleContainer}>
                    <GlobalIndigoHeader4 text={`Food Items`} />
                </Box>
                <Box mb={3}>
                    <Stack direction='row' spacing={1}>
                        <Box>
                            <CreateItemModal />
                        </Box>
                        <Box sx={searchBar}>
                            <TextField id="outlined-basic" color='warning' label="Search Food Name" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
                        </Box>
                    </Stack>
                </Box>
                <Grid2 container sx={centerAlignment} spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <FolderOffTwoToneIcon sx={noItemIcon} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader3 text={`No Food Item Found`} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2
                            text={`We couldn't find any Food Items. Try to create your own Food Item.`}
                        />
                    </Grid2>
                </Grid2>
            </SlideDown>
        );
    }

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text={`Food Items`} />
            </Box>
            <Box mb={3}>
                <Stack direction='row' spacing={1}>
                    <Box>
                        <CreateItemModal />
                    </Box>
                    <Box sx={searchBar}>
                        <TextField id="outlined-basic" color='warning' label="Search Food Name" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
                    </Box>
                </Stack>
            </Box>
            <Grid2 container spacing={3}>
                {menuItems.filter((foodItemList) => {
                    return search.toLowerCase() === '' ? foodItemList : foodItemList.name.toLowerCase().includes(search);
                }).map((foodItemList) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} lx={2.4}>
                        <AnimatePresence>
                            <motion.div layout key={foodItemList._id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}>
                                <Card sx={foodItemCardContainer} key={foodItemList._id}>
                                    {foodItemList.image ? <CardMedia component='img' height='159' image={`${process.env.REACT_APP_BACKEND_URL}${foodItemList.image}`} /> 
                                    : <><Grid2 container justifyContent='center' sx={{backgroundColor: grey[400], height: 171, mb: 0.01}}>
                                            <Grid2 item>
                                                <InsertPhotoIcon sx={uploadImageIcon} />
                                            </Grid2>
                                        </Grid2></>
                                    }
                                    
                                    <CardContent>
                                        <GlobalIndigoHeader6 text={foodItemList.name} />
                                        <GlobalGreyBody2
                                            text={foodItemList.category_name}
                                        />
                                        <GlobalBlackHeader6
                                            text={`₱${foodItemList.price.$numberDecimal}`}
                                        />
                                    </CardContent>
                                    <CardActions sx={{ float: 'right' }}>                                   
                                        <Tooltip title='Update'>
                                            <IconButton>
                                                <UpdateItemModal
                                                    title={'Update ' + foodItemList.name}
                                                    id={foodItemList._id}
                                                    image={foodItemList.image}
                                                    alt={foodItemList.name}
                                                    valueName={foodItemList.name}
                                                    valuePrice={
                                                        foodItemList.price.$numberDecimal
                                                    }
                                                    valueCateg={foodItemList.category_name}
                                                    availability={foodItemList.is_available}
                                                    sx={actionIcon}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete'>
                                            <IconButton>
                                                <DeleteItemModal
                                                    context={ <>
                                                            <Grid2 container>
                                                                Are you sure you want to delete
                                                                <GlobalBlackBody1 text={foodItemList.name} sx={{ ml: 0.5, fontWeight: 'bold' }} />?
                                                            </Grid2>
                                                        </> }
                                                    item_id={foodItemList._id}
                                                    header={`Delete Food Item`}
                                                    sx={actionIcon}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </Grid2>
                ))}
            </Grid2>
        </SlideDown>
    );
}

export default FoodItems;
