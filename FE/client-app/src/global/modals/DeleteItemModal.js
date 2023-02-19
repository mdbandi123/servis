import * as React from 'react';

import { Box, Slide } from '@mui/material';
import { IconButton } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { red } from '@mui/material/colors';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalRedTextButton from '../buttons/text/RedTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteItemModal(props) {
    const [openItemModal, setOpenItemModal] = React.useState(false);

    const itemDeleteHandler = () => {
        setOpenItemModal(true);
    };

    const cancelItemDeleteHandler = () => {
        setOpenItemModal(false);
    };

    const confirmItemDeleteHandler = () => {
        setOpenItemModal(false);
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
            <GlobalRedTextButton text='Remove' onClick={ itemDeleteHandler } />
            <Dialog keepMounted maxWidth='sm' fullWidth open={ openItemModal } TransitionComponent={ Transition } onClose={ cancelItemDeleteHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <ReportProblemIcon sx={ deleteIcon } />
                    <GlobalBlackHeader5 text='Delete Confirmation' />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton>
                        <CloseIcon onClick={ cancelItemDeleteHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text={ props.context } />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={ cancelItemDeleteHandler } />
                    <GlobalBlueTextButton text='Confirm' onClick={ confirmItemDeleteHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteItemModal;