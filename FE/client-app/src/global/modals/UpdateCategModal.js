import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Box, FormControlLabel, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField } from '@mui/material/';
import { CardMedia, Card } from '@mui/material/';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalPinkSwitch from '../switches/PinkSwitch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function UpdateCategModal(props) {
    const [openCreateCategModal, setOpenCreateCategModal] = React.useState(false);

    const CategCreateHandler = () => {
        setOpenCreateCategModal(true);
    };

    const cancelCategCreateHandler = () => {
        setOpenCreateCategModal(false);
    };

    const confirmCategCreateHandler = () => {
        setOpenCreateCategModal(false);
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

    const disableItem = {
        color: grey[900]
    };

    return (
        <React.Fragment>
            <GlobalBlueTextButton text='Update' onClick={ CategCreateHandler } />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openCreateCategModal } TransitionComponent={ Transition } onClose={ cancelCategCreateHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text={ props.title } />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton>
                        <CloseIcon onClick={ cancelCategCreateHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item sx={uploadSection} xs={12} sm={12} md={12} lg={12} lx={12} >
                                <Stack spacing={2}>
                                    <Box>
                                        <Card>
                                            <CardMedia component='img' alt={ props.alt } height='250' image={ props.image } />
                                        </Card>
                                    </Box>
                                    <Box>
                                        <Button variant='contained' component='label' startIcon={ <FileUploadIcon /> }>
                                            Upload <input hidden accept='image/*' multiple type='file' />
                                        </Button>
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Stack spacing={1}>
                                    <Box>
                                        <TextField id='outlined-textarea' defaultValue={ props.value } color='primary' type='text' label='Name' placeholder='Enter Category Name' variant='filled' fullWidth />
                                    </Box>
                                    <Box>
                                        <FormControlLabel sx={disableItem} control={<GlobalPinkSwitch />} label='Disable' />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={ cancelCategCreateHandler } />
                    <GlobalBlueTextButton text='Update' onClick={ confirmCategCreateHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default UpdateCategModal;