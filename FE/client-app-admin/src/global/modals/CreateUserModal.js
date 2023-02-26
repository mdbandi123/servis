import * as React from 'react';
import { Colors } from '../../pages/settings/data/Colors';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, CardActionArea, Slide } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material/';
import { Stack, TextField, MenuItem } from '@mui/material/';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import CloseIcon from '@mui/icons-material/Close';

import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../../global/buttons/text/RedTextButton';
import GlobalBlueTextButton from '../../global/buttons/text/BlueTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function CreateUserModal(props) {
    const [openCreateModal, setOpenCreateModal] = React.useState(false);

    const CreateHandler = () => {
        setOpenCreateModal(true);
    };

    const cancelCreateHandler = () => {
        setOpenCreateModal(false);
    };

    const confirmCreateHandler = () => {
        setOpenCreateModal(false);
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

    return (
        <React.Fragment>
            <CardActionArea onClick={CreateHandler}>{props.children}</CardActionArea>
            <Dialog keepMounted maxWidth='sm' fullWidth open={openCreateModal} TransitionComponent={Transition} onClose={cancelCreateHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text='Create New User' />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelCreateHandler} />
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
                                                <TextField id='outlined-textarea' color='primary' type='text' label='First Name' placeholder='Enter First Name' variant='filled' fullWidth />
                                            </Grid2>
                                            <Grid2 item xs={12} sm={12} md={6} lg={6} lx={6}>
                                                <TextField id='outlined-textarea' color='primary' type='text' label='Last Name' placeholder='Enter Last Name' variant='filled' fullWidth />
                                            </Grid2>
                                        </Grid2>
                                    </Box>
                                    <Box>
                                        <TextField id='filled-select-color' color='primary' label='Theme Color' helperText='Select Theme Color' variant='filled' fullWidth select>
                                            {Colors.map((colors) => (
                                                <MenuItem key={colors.colorName} value={colors.colorName}>
                                                    <Stack direction='row' spacing={1}>
                                                        <Box>
                                                            <SquareRoundedIcon sx={{color: colors.color}} />
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
                    <GlobalRedTextButton text='Cancel' onClick={cancelCreateHandler} />
                    <GlobalBlueTextButton text='Create' onClick={confirmCreateHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default CreateUserModal;