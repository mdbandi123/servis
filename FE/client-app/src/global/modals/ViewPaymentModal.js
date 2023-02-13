import * as React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IconButton } from '@mui/material/';
import { Box, Slide, Stack, CardActionArea, Paper } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';

import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ViewPaymentModal(props) {
    const [openViewPaymentModal, setOpenViewPaymentModal] = React.useState(false);

    const viewPaymentHandler = () => {
        setOpenViewPaymentModal(true);
    };

    const cancelItemDeleteHandler = () => {
        setOpenViewPaymentModal(false);
        console.log('Cancel')
    };

    const closeIconButton = {
        position: 'absolute',
        top: 0,
        right: 0
    }

    const paymentTable = {
        minWidth: 650
    }

    const paymentTableRow = {
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    }

    return (
        <React.Fragment>
            <CardActionArea onClick={viewPaymentHandler}>{props.children}</CardActionArea>
            <Dialog keepMounted fullWidth maxWidth="lg" open={openViewPaymentModal} TransitionComponent={Transition} onClose={cancelItemDeleteHandler} aria-describedby="alert-dialog-slide-description">
                <DialogTitle sx={dialogAlignment}>
                    <AccountCircleIcon sx={props.sx} />
                    <GlobalBlackHeader5 text={props.title + ' (' + props.userId + ')'} />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton >
                        <CloseIcon onClick={cancelItemDeleteHandler} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid2 container justify="flex-start">
                            <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5}>
                                <Stack direction="row" justifyContent="start" spacing={1}>
                                    <Box>
                                        <CalendarMonthIcon />
                                    </Box>
                                    <Box>
                                        <GlobalBlackBody1 text={props.orderDate} />
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5}>
                                <Stack direction="row" justifyContent="start" spacing={1}>
                                    <Box>
                                        <AccessTimeFilledIcon />
                                    </Box>
                                    <Box>
                                        <GlobalBlackBody1 text={props.orderTime} />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                    <TableContainer component={Paper}>
                        <Table sx={ paymentTable } size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Code</TableCell>
                                    <TableCell align="left">Quantity</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Unit Cost</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow sx={ paymentTableRow } >
                                        <TableCell align="left">DUMMY</TableCell>
                                        <TableCell align="left">DUMMY</TableCell>
                                        <TableCell align="left">DUMMY</TableCell>
                                        <TableCell align="left">DUMMY</TableCell>
                                        <TableCell align="left">DUMMY</TableCell>
                                        <TableCell align="left">DUMMY</TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <GlobalBlueTextButton text='Close' onClick={cancelItemDeleteHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ViewPaymentModal;