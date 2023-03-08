import * as React from 'react';

import { Box, Slide } from '@mui/material';
import { IconButton } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueContainedButton from '../buttons/contains/BlueContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ConfirmPaymentModal(props) {
    const [openConfirmPaymentModal, setOpenConfirmPaymentModal] = React.useState(false);

    const confirmPaymentHandler = () => {
        setOpenConfirmPaymentModal(true);
    };

    const cancelConfirmPaymentHandler = () => {
        setOpenConfirmPaymentModal(false);
    };

    const confirmConfirmPaymentHandler = () => {
        setOpenConfirmPaymentModal(false);
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
            <GlobalBlueContainedButton text='Paid' onClick={confirmPaymentHandler} />
            <Dialog keepMounted maxWidth='sm' fullWidth open={openConfirmPaymentModal} TransitionComponent={Transition} onClose={cancelConfirmPaymentHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text='Message Confirmation' />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelConfirmPaymentHandler} />
                    </IconButton>
                </Box>
                <DialogContent >
                    <DialogContentText id='alert-dialog-slide-description' >
                        <GlobalGreyBody1 text={props.context} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={cancelConfirmPaymentHandler} />
                    <GlobalBlueTextButton text='Confirm' onClick={confirmConfirmPaymentHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ConfirmPaymentModal;