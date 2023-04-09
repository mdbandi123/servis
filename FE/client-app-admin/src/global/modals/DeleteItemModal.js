import * as React from 'react';
import { useStore } from '../../store/store';

import { Box, Slide } from '@mui/material';
import { IconButton } from '@mui/material/';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material/';
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
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';
import GlobalTealContainedButton from '../buttons/contains/TealContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteItemModal(props) {
    const [openItemModal, setOpenItemModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const { user } = useStore();

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
        if (props.item_id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/menu_items/item`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.Aa,
                },
                body: JSON.stringify({
                    item_id: props.item_id,
                }),
            })
                .then((res) => {
                    res.json();
                })
                .then((data) => {
                    console.log(data);
                    console.log('success');
                    setOpenItemModal(false);
                })
                .catch((error) => console.log(error.message));
        }

        if (props.category_id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/category`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.Aa,
                },
                body: JSON.stringify({
                    category_id: props.category_id,
                }),
            })
                .then((res) => {
                    res.json();
                })
                .then((data) => {
                    console.log(data);
                    console.log('success');
                    setOpenItemModal(false);
                })
                .catch((error) => console.log(error.message));
        }

        setOpenAlert(true);
    };

    const closeIconButton = {
        position: 'absolute',
        top: 0,
        right: 0,
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
            {/* <GlobalOrangeTextButton text={`Remove`} onClick={itemDeleteHandler} /> */}
            <DeleteIcon onClick={ itemDeleteHandler } sx={ props.sx } />
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
                    Food Item Deleted Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default DeleteItemModal;
