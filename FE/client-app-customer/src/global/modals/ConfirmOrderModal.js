import * as React from 'react';
import store from '../../store/store'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material/';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ConfirmOrderModal(props) {
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);

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
        
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    return (
        <React.Fragment>
            <GlobalBlueContainedButton text={props.text} variant={props.variant} sx={props.sx} onClick={confirmHandler} disabled={props.disabled} />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openConfirmModal } TransitionComponent={ Transition } onClose={ cancelConfirmHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <GlobalBlackHeader5 text='Message Confirmation' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text={ props.context } />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={ cancelConfirmHandler } />
                    <GlobalBlueTextButton text='Confirm' onClick={ proceedConfirmHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ConfirmOrderModal;