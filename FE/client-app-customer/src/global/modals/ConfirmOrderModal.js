import * as React from 'react';
import store from '../../store/store'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material/';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalIndigoTextButton from '../buttons/text/IndigoTextButton';
import GlobalOrangeTextButton from '../buttons/text/OrangeTextButton';
import GlobalTealContainedButton from '../../global/buttons/contains/TealContainedButton';
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ConfirmOrderModal(props) {
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const order_id = store((state) => state.order_id);

    const confirmHandler = () => {
        setOpenConfirmModal(true);
    };

    const cancelConfirmHandler = () => {
        setOpenConfirmModal(false);
    };

    const proceedConfirmHandler = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/checkout/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: order_id,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setOpenConfirmModal(false);
            }
        ).catch((error) => {
            alert(error);
        });
        setOpenAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    const ordersList = {
        fontWeight: 'bold'
    };

    return (
        <React.Fragment>
            <GlobalTealContainedButton text={props.text} variant={props.variant} sx={props.sx} onClick={confirmHandler} disabled={props.disabled} />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openConfirmModal } TransitionComponent={ Transition } onClose={ cancelConfirmHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text='Message Confirmation' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text={ props.context } />
                        <GlobalBlackBody1 text={ props.orders } sx={ ordersList } />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton text='Cancel' onClick={ cancelConfirmHandler } />
                    <GlobalTealContainedButton text='Confirm' onClick={ proceedConfirmHandler } />
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ mb: 8 }}
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Your orders are pending!"
                action={action}
            />
        </React.Fragment>
    );
};

export default ConfirmOrderModal;