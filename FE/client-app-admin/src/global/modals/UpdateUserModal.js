import * as React from 'react';
import { Colors } from '../../pages/settings/data/Colors';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Box, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField, FormControlLabel, MenuItem } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import { grey } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function UpdateUserModal(props) {
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
            <EditIcon onClick={ItemUpdateHandler} sx={props.sx} />
            <Dialog keepMounted maxWidth='sm' fullWidth open={openUpdateItemModal} TransitionComponent={Transition} onClose={cancelItemUpdateHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text={props.title} />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelItemUpdateHandler} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Stack spacing={1}>
                                    <Box>
                                        <Grid2 container spacing={1}>
                                            <Grid2 item xs={12} sm={12} md={6} lg={6} lx={6}>
                                                <TextField id='outlined-textarea' color='primary' type='text' label='First Name' defaultValue={props.defaultFName} placeholder='Enter First Name' variant='filled' fullWidth />
                                            </Grid2>
                                            <Grid2 item xs={12} sm={12} md={6} lg={6} lx={6}>
                                                <TextField id='outlined-textarea' color='primary' type='text' label='Last Name' defaultValue={props.defaultLName} placeholder='Enter Last Name' variant='filled' fullWidth />
                                            </Grid2>
                                        </Grid2>
                                    </Box>
                                    <Box>
                                        <TextField id='filled-select-color' color='primary' label='Theme Color' helperText='Select Theme Color' variant='filled' fullWidth select>
                                            {Colors.map((colors) => (
                                                <MenuItem key={colors.colorName} value={colors.colorName}>
                                                    <Stack direction='row' spacing={1}>
                                                        <Box>
                                                            <SquareRoundedIcon sx={{ color: colors.color }} />
                                                        </Box>
                                                        <Box>
                                                            {colors.colorName}
                                                        </Box>
                                                    </Stack>
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
                    <GlobalRedTextButton text='Cancel' onClick={cancelItemUpdateHandler} />
                    <GlobalBlueTextButton text='Update' onClick={confirmItemUpdateHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default UpdateUserModal;