import * as React from 'react';
import { useStore } from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, CardActionArea, Slide } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material/';
import { TextField } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalOrangeTextButton from '../../global/buttons/text/OrangeTextButton';
import GlobalIndigoTextButton from '../../global/buttons/text/IndigoTextButton';
import GlobalTealContainedButton from '../buttons/contains/TealContainedButton';
import GlobalTealOutlinedButton from '../buttons/outlines/TealOutlinedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateUserModal(props) {
    const { user } = useStore();

    const [tableName, setTableName] = React.useState(null);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const CreateHandler = () => {
        setOpenCreateModal(true);
    };

    const cancelCreateHandler = () => {
        setOpenCreateModal(false);
    };

    const formStateResetHandler = () => {
        setTableName('');
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const confirmCreateHandler = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": user.Aa,
            },
            body: JSON.stringify({
                table_name: tableName,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOpenCreateModal(false);
                setOpenAlert(true);
                formStateResetHandler();
            }
            ).catch((error) => {
                console.log(error);
            });
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
            <GlobalTealContainedButton text='Create' onClick={CreateHandler} />
            <Dialog keepMounted maxWidth='xs' fullWidth open={openCreateModal} TransitionComponent={Transition} onClose={cancelCreateHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text='Create New Table' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Grid2 container spacing={1}>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <TextField id='outlined-textarea' color='warning' type='text' label='Table Name' placeholder='Enter Table Name' value={tableName} variant='filled' fullWidth 
                                        onChange={(e) => { 
                                            const arr = e.target.value.split(" ");

                                            for (var i = 0; i < arr.length; i++) {
                                                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                                            }

                                            const str2 = arr.join(' ');

                                            setTableName(str2);

                                        }} />
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton text='Cancel' onClick={cancelCreateHandler} />
                    <GlobalTealContainedButton text='Create' onClick={confirmCreateHandler} disabled={!tableName} />
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success">
                    Table Created Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default CreateUserModal;