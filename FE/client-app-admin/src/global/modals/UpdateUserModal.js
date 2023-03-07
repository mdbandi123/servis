import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useStore } from '../../store/store';

import { Box, Slide } from '@mui/material';
import { IconButton } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function UpdateUserModal(props) {
    const { user } = useStore();
    const [openUpdateItemModal, setOpenUpdateItemModal] = React.useState(false);

    const [newTableName, setNewTableName] = React.useState('');

    const ItemUpdateHandler = () => {
        setOpenUpdateItemModal(true);
    };

    const cancelItemUpdateHandler = () => {
        setOpenUpdateItemModal(false);
    };

    const confirmItemUpdateHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/update/${props.tableName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.Aa
            },
            body: JSON.stringify({
                new_table_name: newTableName,
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data.message);
                setOpenUpdateItemModal(false);
            }).catch((error) => {
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
            <EditIcon onClick={ItemUpdateHandler} sx={props.sx} />
            <Dialog keepMounted maxWidth='sm' fullWidth open={openUpdateItemModal} TransitionComponent={Transition} onClose={cancelItemUpdateHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text={props.title} />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelItemUpdateHandler} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <TextField id='outlined-textarea' color='primary' type='text' label='User Name' defaultValue={props.defaultName} placeholder='Enter User Name' variant='filled' fullWidth onChange={(e) => setNewTableName(e.target.value)} />
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={cancelItemUpdateHandler} />
                    <GlobalBlueTextButton text='Update' onClick={confirmItemUpdateHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default UpdateUserModal;