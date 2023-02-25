import * as React from 'react';

import { Box, Slide } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material/';
import { red } from '@mui/material/colors';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalRedTextButton from '../buttons/text/RedTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteUserModal(props) {
    const [openModal, setOpenModal] = React.useState(false);

    const deleteHandler = () => {
        setOpenModal(true);
    };

    const cancelDeleteHandler = () => {
        setOpenModal(false);
    };

    const confirmDeleteHandler = () => {
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
            <Dialog keepMounted maxWidth='sm' fullWidth open={openModal} TransitionComponent={Transition} onClose={cancelDeleteHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <ReportProblemIcon sx={deleteIcon} />
                    <GlobalBlackHeader5 text='Delete User Confirmation' />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelDeleteHandler} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text={props.context} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={cancelDeleteHandler} />
                    <GlobalBlueTextButton text='Confirm' onClick={confirmDeleteHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteUserModal;