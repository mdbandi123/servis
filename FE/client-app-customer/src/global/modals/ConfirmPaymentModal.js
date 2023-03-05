import * as React from 'react';
import store from '../../store/store';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material/';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueContainedButton from '../buttons/contains/BlueContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ConfirmPaymentModal(props) {
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
    const order_id = store((state) => state.order_id);

    const confirmHandler = () => {
        setOpenConfirmModal(true);
    };

    const cancelConfirmHandler = () => {
        setOpenConfirmModal(false);
    };

    const proceedConfirmHandler = () => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/billed_out/${order_id}`,
                {
                    method: 'PUT',
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message);
                    setOpenConfirmModal(false);
                }
            ).catch((error) => {
                console.log(error);
            });
        
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    return (
        <React.Fragment>
            <GlobalBlueContainedButton text={props.text} variant={props.variant} sx={props.sx} onClick={ confirmHandler } />
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

export default ConfirmPaymentModal;