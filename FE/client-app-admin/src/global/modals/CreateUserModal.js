import * as React from 'react';
import { useStore } from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, CardActionArea, Slide } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material/';
import { TextField } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';

import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalOrangeTextButton from '../../global/buttons/text/OrangeTextButton';
import GlobalIndigoTextButton from '../../global/buttons/text/IndigoTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function CreateUserModal(props) {
    const { user } = useStore();

    const [tableName, setTableName] = React.useState(null);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);

    const CreateHandler = () => {
        setOpenCreateModal(true);
    };

    const cancelCreateHandler = () => {
        setOpenCreateModal(false);
    };

    const formStateResetHandler = () => {
        setTableName('');
    }

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
            <CardActionArea onClick={CreateHandler}>{props.children}</CardActionArea>
            <Dialog keepMounted maxWidth='sm' fullWidth open={openCreateModal} TransitionComponent={Transition} onClose={cancelCreateHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text='Create New User' />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelCreateHandler} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <Grid2 container spacing={1}>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <TextField inputProps={{maxLength:7}} id='outlined-textarea' color='warning' type='text' label='User Name' placeholder='Enter User Name' value={tableName} variant='filled' fullWidth onChange={(e) => setTableName(e.target.value)} />
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalOrangeTextButton text='Cancel' onClick={cancelCreateHandler} />
                    <GlobalIndigoTextButton text='Create' onClick={confirmCreateHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default CreateUserModal;