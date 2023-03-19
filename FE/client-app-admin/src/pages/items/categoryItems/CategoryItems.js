import * as React from 'react';
import { useStore } from '../../../store/store';

import { motion, AnimatePresence } from 'framer-motion';
import { teal } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CardActions, CardMedia, CardContent, Card, Tooltip, IconButton, Stack } from '@mui/material/';
import FolderOffTwoToneIcon from '@mui/icons-material/FolderOffTwoTone';
import {grey} from '@mui/material/colors';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalIndigoHeader4 from '../../../global/typographies/headers/IndigoHeader4';
import GlobalBlackHeader3 from '../../../global/typographies/headers/BlackHeader3';
import GlobalGreyBody2 from '../../../global/typographies/bodies/GreyBody2';
import DeleteItemModal from '../../../global/modals/DeleteItemModal';
import CreateCategModal from '../../../global/modals/CreateCategModal';
import UpdateCategModal from '../../../global/modals/UpdateCategModal';
import GlobalIndigoHeader6 from '../../../global/typographies/headers/IndigoHeader6';
import SlideDown from '../../../animation/SlideDown';
import GlobalBlackBody1 from '../../../global/typographies/bodies/BlackBody1';

function CategoryItems() {
    const {CategoryData, setCategoryItems} = useStore();

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCategoryItems(data.categories);
            })
            .catch((error) => console.error(error));
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

    if (CategoryData.length === 0) {
        return (
            <SlideDown>
                <Box sx={pageTitleContainer}>
                    <GlobalIndigoHeader4 text={ `Category Items` } />
                </Box>
                <Box mb={3}>
                    <CreateCategModal />
                </Box>
                <Grid2 container sx={centerAlignment} spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <FolderOffTwoToneIcon sx={noItemIcon} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader3 text={ `No Category Item Found` } />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2
                            text={`We couldn't find any Category Items. Try to create your own Category Item.`}
                        />
                    </Grid2>
                </Grid2>
            </SlideDown>
        );
    }

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text={ `Category Items` } />
            </Box>
            <Box mb={3}>
                <CreateCategModal/>
            </Box>
            <Grid2 container spacing={3}>
                {CategoryData.map((categItemList) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} lx={2.4}>
                        <AnimatePresence>
                            <motion.div layout key={categItemList._id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} exit={{ opacity: 1, scale: 0, transition: { duration: 1} }}>
                                <Card
                                    sx={foodItemCardContainer}
                                    key={categItemList._id}
                                >
                                    {/* <CardMedia
                                        component='img'
                                        alt={categItemList.category_name}
                                        height='140'
                                        image={`${process.env.REACT_APP_BACKEND_URL}${categItemList.category_image}`}
                                    /> */}

                                    {categItemList.category_image ? <CardMedia component='img' height='159' image={`${process.env.REACT_APP_BACKEND_URL}${categItemList.category_image}`} />
                                        : <><Grid2 container justifyContent='center' sx={{ backgroundColor: grey[400], height: 171, mb: 0.01 }}>
                                            <Grid2 item>
                                                <InsertPhotoIcon sx={uploadImageIcon} />
                                            </Grid2>
                                        </Grid2></>
                                    }

                                    <CardContent>
                                        <GlobalIndigoHeader6
                                            text={categItemList.category_name}
                                        />
                                    </CardContent>
                                    <CardActions sx={{float: 'right'}}>
                                        <Tooltip title='Update'>
                                            <IconButton>
                                                <UpdateCategModal
                                                    title={
                                                        'Update ' + categItemList.category_name
                                                    }
                                                    value={categItemList.category_name}
                                                    image={categItemList.category_image}
                                                    alt={categItemList.category_name}
                                                    category_id={categItemList._id}
                                                    category_name={categItemList.category_name}
                                                    sx={actionIcon}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete'>
                                            <IconButton>
                                                <DeleteItemModal
                                                    context={<>
                                                        <Grid2 container>
                                                            Are you sure you want to delete
                                                            <GlobalBlackBody1 text={categItemList.category_name} sx={{ ml: 0.5, fontWeight: 'bold' }} />?
                                                        </Grid2>
                                                    </> }
                                                    category_id={categItemList._id}
                                                    header={`Delete Category Item`}
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

export default CategoryItems;
