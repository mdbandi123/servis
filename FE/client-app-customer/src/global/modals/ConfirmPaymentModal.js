import * as React from 'react';
import store from '../../store/store';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material/';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalIndigoTextButton from '../buttons/text/IndigoTextButton';
import GlobalOrangeTextButton from '../buttons/text/OrangeTextButton';
import GlobalTealContainedButton from '../buttons/contains/TealContainedButton';
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ConfirmPaymentModal(props) {
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
    const order_id = store((state) => state.order_id);
    const { setOrderId } = store();

    const navigate = useNavigate();

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
                    localStorage.removeItem('order_id');
                    setOrderId(null)
                    navigate('/');
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
            <GlobalTealContainedButton text={props.text} variant={props.variant} sx={props.sx} onClick={ confirmHandler } disabled={props.disabled} />
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
                    <GlobalTealOutlinedButton text='Cancel' onClick={ cancelConfirmHandler } />
                    <GlobalTealContainedButton text='Confirm' onClick={ proceedConfirmHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ConfirmPaymentModal;