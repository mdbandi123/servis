import * as React from 'react';
import { CategoryData } from '../../pages/items/categoryItems/datas/CategoryData';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Box, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField, FormControlLabel, MenuItem } from '@mui/material/';
import { CardMedia, Card } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalPinkSwitch from '../switches/PinkSwitch';
import { grey } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function UpdateItemModal(props) {
    const [openUpdateItemModal, setOpenUpdateItemModal] = React.useState(false);

    const ItemUpdateHandler = () => {
        setOpenUpdateItemModal(true);
    };

    const cancelItemUpdateHandler = () => {
        setOpenUpdateItemModal(false);
    };

    const confirmItemUpdateHandler = () => {
        setOpenUpdateItemModal(false);
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
            <GlobalBlueTextButton text='Update' onClick={ ItemUpdateHandler } />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openUpdateItemModal } TransitionComponent={ Transition } onClose={ cancelItemUpdateHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text={ props.title } />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton>
                        <CloseIcon onClick={ cancelItemUpdateHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item sx={ uploadSection } xs={12} sm={12} md={6} lg={6} lx={6} >
                                <Stack spacing={2}>
                                    <Box>
                                        <Card>
                                            <CardMedia component='img' alt={ props.alt } height='280' image={ props.image } />
                                        </Card>
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
                                        <TextField id='outlined-textarea' defaultValue={ props.valueName } color='primary' type='text' label='Name' placeholder='Enter Food Name' variant='filled' fullWidth />
                                    </Box>
                                    <Box>
                                        <TextField id='outlined-textarea' defaultValue={ props.valuePrice } color='primary' type='number' label='Price' placeholder='Enter Food Price' variant='filled' fullWidth />
                                    </Box>
                                    <Box>
                                        <TextField id='filled-select-currency' defaultValue={ props.valueCateg } color='primary' label='Category' helperText='Select Category' variant='filled' fullWidth select>
                                            {CategoryData.map((selectCateg) => (
                                                <MenuItem key={ selectCateg.categItemName } value={ selectCateg.categItemName }>
                                                    { selectCateg.categItemName }
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                    <Box>
                                        <FormControlLabel sx={disableItem} control={ <GlobalPinkSwitch />} label='Disable' />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={ cancelItemUpdateHandler } />
                    <GlobalBlueTextButton text='Update' onClick={ confirmItemUpdateHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default UpdateItemModal;