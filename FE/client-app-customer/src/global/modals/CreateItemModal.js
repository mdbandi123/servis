import * as React from 'react';
import { CategoryData } from '../../pages/items/categoryItems/datas/CategoryData';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Box, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField, MenuItem } from '@mui/material/';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../../global/buttons/text/RedTextButton';
import GlobalBlueTextButton from '../../global/buttons/text/BlueTextButton';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function CreateItemModal(props) {
    const [openCreateItemModal, setOpenCreateItemModal] = React.useState(false);

    const ItemCreateHandler = () => {
        setOpenCreateItemModal(true);
    };

    const cancelItemCreateHandler = () => {
        setOpenCreateItemModal(false);
    };

    const confirmItemCreateHandler = () => {
        setOpenCreateItemModal(false);
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
            <GlobalBlueContainedButton text='Create' onClick={ ItemCreateHandler } />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openCreateItemModal } TransitionComponent={ Transition } onClose={ cancelItemCreateHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text='Create New Item' />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton>
                        <CloseIcon onClick={ cancelItemCreateHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item sx={ uploadSection } xs={12} sm={12} md={6} lg={6} lx={6} >
                                <Stack spacing={2}>
                                    <Box>
                                        <InsertPhotoIcon sx={ uploadImageIcon } />
                                        <GlobalGreyBody1 text='Upload Item Image' />
                                    </Box>
                                    <Box>
                                        <Button variant='contained' component='label' startIcon={ <FileUploadIcon /> }>
                                            Upload <input hidden accept='image/*' multiple type='file' />
                                        </Button>
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={6} lg={6} lx={6}>
                                <Stack spacing={1}>
                                    <Box>
                                        <TextField id='outlined-textarea' color='primary' type='text' label='Name' placeholder='Enter Food Name' variant='filled' fullWidth />
                                    </Box>
                                    <Box>
                                        <TextField id='outlined-textarea' color='primary' type='number' label='Price' placeholder='Enter Food Price' variant='filled' fullWidth />
                                    </Box>
                                    <Box>
                                        <TextField id='filled-select-currency' color='primary' label='Category' helperText='Select Category' variant='filled' fullWidth select>
                                            {CategoryData.map((selectCateg) => (
                                                <MenuItem key={ selectCateg.categItemName } value={ selectCateg.categItemName }>
                                                    { selectCateg.categItemName }
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={ cancelItemCreateHandler } />
                    <GlobalBlueTextButton text='Create' onClick={ confirmItemCreateHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default CreateItemModal;