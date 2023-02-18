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
import { purple, blue, grey } from '@mui/material/colors';

import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function ViewPaymentModal(props) {
    const [openViewPaymentModal, setOpenViewPaymentModal] = React.useState(false);

    const viewPaymentHandler = () => {
        setOpenViewPaymentModal(true);
    };

    const cancelViewModalHandler = () => {
        setOpenViewPaymentModal(false);
    };

    const closeIconButton = {
        position: 'absolute',
        top: 0,
        right: 0
    };

    const paymentTable = {
        minWidth: 650
    };

    const paymentTableRow = {
        '&:last-child td, &:last-child th': {
            border: 0
        }
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    const dateAndTimeIcon = {
        color: purple[900],
    };

    const tableHeadText = {
        color: 'white'
    };

    const tableHeadContainer = {
        backgroundColor: blue[700] 
    };

    const tableBodyContainer = {
        backgroundColor: grey[200],
    };

    const totalPaymentTableRow = {
        color: blue[900],
        fontWeight: 600
    };

    return (
        <React.Fragment>
            <CardActionArea onClick={ viewPaymentHandler }>{props.children}</CardActionArea>
            <Dialog keepMounted fullWidth maxWidth='lg' open={ openViewPaymentModal } TransitionComponent={ Transition } onClose={ cancelViewModalHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <AccountCircleIcon sx={ props.sx } />
                    <GlobalBlackHeader5 text={ props.title + ' (' + props.userId + ')' } />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton >
                        <CloseIcon onClick={ cancelViewModalHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container justify='flex-start'>
                            <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5} >
                                <Stack direction='row' justifyContent='start' spacing={1}>
                                    <Box>
                                        <CalendarMonthIcon sx={ dateAndTimeIcon } />
                                    </Box>
                                    <Box>
                                        <GlobalBlackBody1 text={ props.orderDate } />
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5} >
                                <Stack direction='row' justifyContent='start' spacing={1}>
                                    <Box>
                                        <AccessTimeFilledIcon sx={ dateAndTimeIcon } />
                                    </Box>
                                    <Box>
                                        <GlobalBlackBody1 text={ props.orderTime } />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                    <TableContainer component={ Paper }>
                        <Table sx={ paymentTable } size='small' aria-label='a dense table'>
                            <TableHead sx={ tableHeadContainer }>
                                <TableRow>
                                    <TableCell sx={ tableHeadText } align='left'>Name</TableCell>
                                    <TableCell sx={ tableHeadText } align='left'>Code</TableCell>
                                    <TableCell sx={ tableHeadText } align='left'>Category</TableCell>
                                    <TableCell sx={ tableHeadText } align='left'>Quantity</TableCell>
                                    <TableCell sx={ tableHeadText } align='left'>Unit Cost</TableCell>
                                    <TableCell sx={ tableHeadText } align='left'>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={ tableBodyContainer }>
                                    <TableRow sx={ paymentTableRow } >
                                        <TableCell align='left'>Food Name</TableCell>
                                        <TableCell align='left'>Meal</TableCell>
                                        <TableCell align='left'>#3232</TableCell>
                                        <TableCell align='left'>2</TableCell>
                                        <TableCell align='left'>250</TableCell>
                                        <TableCell align='left'>500</TableCell>
                                    </TableRow>
                                    <TableRow sx={ paymentTableRow } >
                                        <TableCell sx={ totalPaymentTableRow } align='left' colSpan={6}>Total: 500</TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <GlobalBlueTextButton text='Close' onClick={ cancelViewModalHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ViewPaymentModal;