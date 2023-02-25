import * as React from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { purple, blue, grey } from '@mui/material/colors';
import { Box, Slide, Stack, CardActionArea, Paper,IconButton } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalGreyBody2 from '../typographies/bodies/GreyBody2';
import GlobalBlackHeader4 from '../typographies/headers/BlackHeader4';

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

    // if (orderListNotification.length === 0) {
    //     return(
    //         <React.Fragment>
    //             <CardActionArea onClick={viewPaymentHandler}>{props.children}</CardActionArea>
    //             <Dialog keepMounted fullWidth maxWidth='lg' open={openViewPaymentModal} TransitionComponent={Transition} onClose={cancelViewModalHandler} aria-describedby='alert-dialog-slide-description'>
    //                 <DialogTitle sx={dialogAlignment}>
    //                     <AccountCircleIcon sx={props.sx} />
    //                     <GlobalBlackHeader5 text={props.title + ' (' + props.userId + ')'} />
    //                 </DialogTitle>
    //                 <Box sx={closeIconButton}>
    //                     <IconButton >
    //                         <CloseIcon onClick={cancelViewModalHandler} />
    //                     </IconButton>
    //                 </Box>
    //                 <DialogContent>
    //                     <DialogContentText id='alert-dialog-slide-description'>
    //                         <Grid2 container justify='flex-start'>
    //                             <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5} >
    //                                 <Stack direction='row' justifyContent='start' spacing={1}>
    //                                     <Box>
    //                                         <CalendarMonthIcon sx={dateAndTimeIcon} />
    //                                     </Box>
    //                                     <Box>
    //                                         <GlobalBlackBody1 text='--/--/----' />
    //                                     </Box>
    //                                 </Stack>
    //                             </Grid2>
    //                             <Grid2 item xs={12} sm={2.5} md={1.5} lg={1.5} lx={1.5} >
    //                                 <Stack direction='row' justifyContent='start' spacing={1}>
    //                                     <Box>
    //                                         <AccessTimeFilledIcon sx={dateAndTimeIcon} />
    //                                     </Box>
    //                                     <Box>
    //                                         <GlobalBlackBody1 text='--/--/--' />
    //                                     </Box>
    //                                 </Stack>
    //                             </Grid2>
    //                         </Grid2>
    //                     </DialogContentText>
    //                     <TableContainer component={Paper}>
    //                         <Table sx={paymentTable} size='small' aria-label='a dense table'>
    //                             <TableHead sx={tableHeadContainer}>
    //                                 <TableRow>
    //                                     <TableCell sx={tableHeadText} align='left'>Name</TableCell>
    //                                     <TableCell sx={tableHeadText} align='left'>Code</TableCell>
    //                                     <TableCell sx={tableHeadText} align='left'>Category</TableCell>
    //                                     <TableCell sx={tableHeadText} align='left'>Quantity</TableCell>
    //                                     <TableCell sx={tableHeadText} align='left'>Unit Cost</TableCell>
    //                                     <TableCell sx={tableHeadText} align='left'>Amount</TableCell>
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody sx={tableBodyContainer}>
    //                                 <TableRow>
    //                                     <TableCell align='left' colSpan={6}>
    //                                         <Grid2 container sx={centerAlignment} spacing={1}>
    //                                             <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
    //                                                 <FindInPageTwoToneIcon sx={noItemIcon} />
    //                                             </Grid2>
    //                                             <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
    //                                                 <GlobalBlackHeader4 text='No Ordered List Found' />
    //                                             </Grid2>
    //                                             <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
    //                                                 <GlobalGreyBody2 text={`We couldn't find any Ordered List. Please Wait for Customers' Billout`} />
    //                                             </Grid2>
    //                                         </Grid2>
    //                                     </TableCell>
    //                                 </TableRow>
    //                             </TableBody>
    //                         </Table>
    //                     </TableContainer>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <GlobalBlueTextButton text='Close' onClick={cancelViewModalHandler} />
    //                 </DialogActions>
    //             </Dialog>
    //         </React.Fragment>
    //     );
    // };

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
                            <TableBody sx={tableBodyContainer}>
                                {props.ordered_items.map(item => (
                                <TableRow sx={paymentTableRow}>
                                    <TableCell align='left'>{item.item_name}</TableCell>
                                    <TableCell align='left'>{item._id}</TableCell>
                                    <TableCell align='left'>{item.item_category}</TableCell>
                                    <TableCell align='left'>{item.quantity}</TableCell>
                                    <TableCell align='left'>{item.item_price.$numberDecimal}</TableCell>
                                    <TableCell align='left'>{item.total_price}</TableCell>
                                </TableRow>
                                ))}
                                <TableRow sx={totalPaymentTableRow}>
                                <TableCell sx={totalPaymentTableRow} align='left' colSpan={6}>
                                    Total: {props.ordered_items.reduce((acc, item) => acc + item.total_price, 0)}
                                </TableCell>
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