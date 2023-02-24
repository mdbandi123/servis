import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Box, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField } from '@mui/material/';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { CardMedia } from "@mui/material/";

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalBlueContainedButton from '../buttons/contains/BlueContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function CreateCategModal(props) {
    const [openCreateCategModal, setOpenCreateCategModal] = React.useState(false);
    const [category_name, setCategoryName] = React.useState('');
    const [category_image, setCategoryImage] = React.useState(null);

    const CategCreateHandler = () => {
        setOpenCreateCategModal(true);
    };

    const cancelCategCreateHandler = () => {
        setOpenCreateCategModal(false);
    };

    const confirmCategCreateHandler = () => {
        if (category_image) {
            const formData = new FormData();
            formData.append("file", category_image);  

            fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            method: "POST",
            body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("File uploaded successfully");
                fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/category`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category_name: category_name,
                        category_image: data.imageUrl
                    }),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setOpenCreateCategModal(false);
                        setCategoryImage(null);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category_name: category_name,
                    category_image: null
                }),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setOpenCreateCategModal(false);
                    setCategoryImage(null);
                })
                .catch((error) => console.error(error));
        }
    };

    const closeIconButton = {
        position: 'absolute',
        top: 0,
        right: 0
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    const uploadSection = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const uploadImageIcon = {
        fontSize: '15em',
        color: grey[500]
    };

    return (
        <React.Fragment>
            <GlobalBlueContainedButton text='Create' onClick={ CategCreateHandler } />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openCreateCategModal } TransitionComponent={ Transition } onClose={ cancelCategCreateHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text='Create New Category' />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton >
                        <CloseIcon onClick={ cancelCategCreateHandler } />
                    </IconButton>
                </Box>
                <DialogContent >
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item sx={ uploadSection } xs={12} sm={12} md={12} lg={12} lx={12} >
                                <Stack spacing={2}>
                                    <Box>
                                        {category_image ? <CardMedia component='img' height='280' image={URL.createObjectURL(category_image)} /> : <InsertPhotoIcon sx={ uploadImageIcon } />}
                                        <GlobalGreyBody1 text='Upload Category Image' />
                                    </Box>
                                    <Box>
                                        <Button variant='contained' component='label' startIcon={ <FileUploadIcon /> }>
                                            Upload <input hidden accept='image/*' multiple type='file' onChange={(e) => setCategoryImage(e.target.files[0])}/>
                                        </Button>
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Stack spacing={1}>
                                    <Box>
                                        <TextField id='outlined-textarea' color='primary' type='text' label='Name' placeholder='Enter Category Name' variant='filled' onChange={(e)=>{
                                            setCategoryName(e.target.value);
                                        }} fullWidth />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={ cancelCategCreateHandler } />
                    <GlobalBlueTextButton text='Create' onClick={ confirmCategCreateHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default CreateCategModal;