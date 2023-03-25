import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useStore } from '../../store/store';

import { Box, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField } from '@mui/material/';
import { CardMedia, Card } from '@mui/material/';
import { teal } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalOrangeTextButton from '../buttons/text/OrangeTextButton';
import GlobalIndigoTextButton from '../buttons/text/IndigoTextButton';
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';
import GlobalTealContainedButton from '../buttons/contains/TealContainedButton';
import {grey} from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function UpdateCategModal(props) {
    const [openCreateCategModal, setOpenCreateCategModal] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [categoryName, setCategoryName] = React.useState(props.category_name);
    const [openAlert, setOpenAlert] = React.useState(false);

    const { user } = useStore();

    const CategCreateHandler = () => {
        setOpenCreateCategModal(true);
    };

    const cancelCategCreateHandler = () => {
        setOpenCreateCategModal(false);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const confirmCategCreateHandler = () => {
        if (image) {
            const formData = new FormData();
            formData.append("file", image);  

            fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            method: "POST",
            headers: {
                "Authorization": user.Aa,
            },
            body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/category`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": user.Aa,
                    },
                    body: JSON.stringify({
                        category_id: props.category_id,
                        category_name: categoryName,
                        category_image: data.imageUrl,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setOpenCreateCategModal(false);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/category`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.Aa,
                },
                body: JSON.stringify({
                    category_id: props.category_id,
                    category_name: categoryName,
                    category_image: props.image,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setOpenCreateCategModal(false);
                })
                .catch((error) => console.error(error));
        }
        setOpenAlert(true);
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

    const uploadButton = {
        backgroundColor: teal[400],
        '&:hover': {
            backgroundColor: teal[500],
            transition: '0.5s'
        }
    }

    const uploadImageIcon = {
        fontSize: '15em',
        color: grey[600]
    };

    return (
        <React.Fragment>
            <EditIcon onClick={ CategCreateHandler } sx={ props.sx } />
            {/* <GlobalIndigoTextButton text='Update' onClick={ CategCreateHandler } /> */}
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openCreateCategModal } TransitionComponent={ Transition } onClose={ cancelCategCreateHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text={ props.title } />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item sx={uploadSection} xs={12} sm={12} md={12} lg={12} lx={12} >
                                <Stack spacing={2}>
                                    <Box>
                                        <Card>
                                            <CardMedia 
                                                component='img' height='250' 
                                                alt={ props.alt } 
                                                image={ image ? URL.createObjectURL(image) : 
                                                `${process.env.REACT_APP_BACKEND_URL}${props.image}` } 
                                            />
                                        </Card>
                                    </Box>
                                    <Box>
                                        <Button sx={uploadButton} variant='contained' component='label' startIcon={ <FileUploadIcon /> }>
                                            Upload <input hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} multiple type='file' />
                                        </Button>
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Stack spacing={1}>
                                    <Box>
                                        <TextField id='outlined-textarea' defaultValue={ props.value } color='warning' type='text' label='Name' onChange={(e) => setCategoryName(e.target.value)} placeholder='Enter Category Name' variant='filled' fullWidth />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton text='Cancel' onClick={ cancelCategCreateHandler } />
                    <GlobalTealContainedButton text='Update' onClick={ confirmCategCreateHandler } disabled={!categoryName} />
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success" >
                    Category Updated Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default UpdateCategModal;