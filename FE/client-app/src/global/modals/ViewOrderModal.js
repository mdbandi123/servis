import * as React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IconButton } from '@mui/material/';
import { Box, Slide, Stack, CardActionArea, Paper } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';

import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { purple, blue, grey } from '@mui/material/colors';

import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ViewOrderModal(props) {
    const [openViewOrderModal, setOpenViewOrderModal] = React.useState(false);

    const viewOrderHandler = () => {
        setOpenViewOrderModal(true);
    };

    const cancelViewModalHandler = () => {
        setOpenViewOrderModal(false);
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

    const dateAndTimeIcon = {
        color: purple[900],
    };

    return (
        <React.Fragment>
            <CardActionArea onClick={ viewOrderHandler }>{props.children}</CardActionArea>
            <Dialog keepMounted fullWidth maxWidth='lg' open={ openViewOrderModal } TransitionComponent={ Transition } onClose={ cancelViewModalHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <AccountCircleIcon sx={ props.sx } />
                    <GlobalBlackHeader5 text={ props.title + ' (' + props.userId + ')' } />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton >
                        <CloseIcon onClick={ cancelViewModalHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container justify='flex-start'>
                            <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5} >
                                <Stack direction='row' justifyContent='start' spacing={1}>
                                    <Box>
                                        <CalendarMonthIcon sx={ dateAndTimeIcon } />
                                    </Box>
                                    <Box>
                                        <GlobalBlackBody1 text={ props.orderDate } />
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5} >
                                <Stack direction='row' justifyContent='start' spacing={1}>
                                    <Box>
                                        <AccessTimeFilledIcon sx={ dateAndTimeIcon } />
                                    </Box>
                                    <Box>
                                        <GlobalBlackBody1 text={ props.orderTime } />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalBlueTextButton text='Close' onClick={ cancelViewModalHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ViewOrderModal;