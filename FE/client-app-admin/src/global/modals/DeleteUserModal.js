import * as React from 'react';
import { useStore } from '../../store/store';

import { Box, Slide } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material/';
import { red } from '@mui/material/colors';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalIndigoTextButton from '../buttons/text/IndigoTextButton';
import GlobalOrangeTextButton from '../buttons/text/OrangeTextButton';
import GlobalTealContainedButton from '../buttons/contains/TealContainedButton';
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteUserModal(props) {
    const { user } = useStore();
    const [openModal, setOpenModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const deleteHandler = () => {
        setOpenModal(true);
    };

    const cancelDeleteHandler = () => {
        setOpenModal(false);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const confirmDeleteHandler = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/delete/${props.tableName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': user.Aa
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data.message);
                }
            })
            .catch(err => console.log(err));
        
        setOpenAlert(true);
        setOpenModal(false);
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

    const deleteIcon = {
        mr: 1,
        color: red[700]
    };

    return (
        <React.Fragment>
            <DeleteIcon onClick={deleteHandler} sx={props.sx} />
            <Dialog keepMounted maxWidth='xs' fullWidth open={openModal} TransitionComponent={Transition} onClose={cancelDeleteHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <ReportProblemIcon sx={deleteIcon} />
                    <GlobalBlackHeader5 text={props.message} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text={props.context} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton text='Cancel' onClick={cancelDeleteHandler} />
                    <GlobalTealContainedButton text='Confirm' onClick={confirmDeleteHandler} />
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success">
                    Table Deleted Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default DeleteUserModal;