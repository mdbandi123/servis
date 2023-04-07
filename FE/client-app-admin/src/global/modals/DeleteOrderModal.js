import * as React from 'react';
import { useStore } from '../../store/store';

import { Slide } from '@mui/material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip
} from '@mui/material/';
import { red } from '@mui/material/colors';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';
import GlobalTealContainedButton from '../buttons/contains/TealContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteOrderModal(props) {
    const [openItemModal, setOpenItemModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const itemDeleteHandler = () => {
        setOpenItemModal(true);
    };

    const cancelItemDeleteHandler = () => {
        setOpenItemModal(false);
    };

    const confirmItemDeleteHandler = () => {
        props.deleteHandler()

        setOpenItemModal(false);
        setOpenAlert(true);
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex',
    };

    const deleteIcon = {
        mr: 1,
        color: red[700],
    };

    return (
        <React.Fragment>
            <Chip sx={props.sx} variant={props.variant} label={props.label} onClick={itemDeleteHandler} disabled={props.disabled} />
            <Dialog
                keepMounted
                maxWidth='sm'
                fullWidth
                open={openItemModal}
                TransitionComponent={Transition}
                onClose={cancelItemDeleteHandler}
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle sx={dialogAlignment}>
                    <ReportProblemIcon sx={deleteIcon} />
                    <GlobalBlackHeader5 text={props.header} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text={props.context} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton text={`Cancel`} onClick={cancelItemDeleteHandler} />
                    <GlobalTealContainedButton text={`Confirm`} onClick={confirmItemDeleteHandler} />
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success" >
                    Order Deleted Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default DeleteOrderModal;
