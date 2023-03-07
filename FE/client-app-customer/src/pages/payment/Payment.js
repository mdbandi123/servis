import * as React from 'react';
import {useState} from 'react';
import { PaymentMethodList } from './data/PaymentMethodList';
import store from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import { Box, Paper } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { List, ListItem, Radio, RadioGroup } from '@mui/joy/';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';

import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import ConfirmPaymentModal from '../../global/modals/ConfirmPaymentModal';
import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalPinkHeader6 from '../../global/typographies/headers/PinkHeader6';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';

function createData(name, price, quantity, total) {
    return { name, price, quantity, total };
}

const rows = [
    createData('Pork Tonkatsu', 145, 10, 1450),
    createData('Mango Pudding', 237, 33, 12312),
    createData('Wine Braise Beef', 262, 31, 2312),
    createData('PikePerch Fillet', 305, 32, 2321),
    createData('Fried Chicken', 356, 2, 2321)
];

function Payment() {
    const { setOrderedItems } = store.getState();
    const order_id = store((state) => state.order_id);
    const orderedItems = store((state) => state.orderedItems);
    const rowItem = orderedItems

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/items/${order_id || localStorage.getItem("order_id")}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setOrderedItems(data.items);
                } else {
                    console.log(data.error);
                }
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);
    
    const headerPage = {
        pb: 2,
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const paymentMethod = {
        pt: 4,
        pb: 2,
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 2
    };

    const totalMessage = {
        display: 'inline',
        fontWeight: 'bold',
        float: { xs: 'left', sm: 'left', md: 'left', lg: 'left', lx: 'left' }
    };

    const totalAmount = {
        float: { xs: 'right', sm: 'right', md: 'right', lg: 'left', lx: 'left' },
        fontWeight: 'bold'
    };

    const paymentMethodList = {
        minWidth: 240,
        '--List-gap': '0.5rem',
        '--List-item-paddingY': '1rem',
        '--List-item-radius': '8px',
        '--List-decorator-size': '32px'
    };

    const paymentMethodListItem = {
        boxShadow: 'sm',
        bgcolor: grey[50]
    };

    const radioAlignment = {
        flexGrow: 1,
        flexDirection: 'row-reverse',
        color: blue[700]
    };

    const confirmContainer = {
        mt: 0.5
    };

    const confirmBtn = {
        width: '100%'
    };

    const tableHead = {
        backgroundColor: blue[700]
    };

    const tableRow = {
        '&:last-child td, &:last-child th': { 
            border: 0 
        }
    };

    const tableCell = {
        color: grey[50]
    };

    const cellName = {
        minWidth: '40%'
    };

    const cellPrice = {
        minWidth: '20%'
    };

    const cellQuantity = {
        minWidth: '5%'
    };

    const centerAlignment = {
        pt: 3,
        pb: 2,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const noItemIcon = {
        fontSize: '4em',
        color: grey[600]
    };

    if (rowItem.length === 0) {
        return (
            <React.Fragment>
                <Box sx={pageContainer}>
                    <Box sx={headerPage}>
                        <GlobalBlackHeader4 text='Receipt' />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table aria-label='simple table'>
                            <TableHead sx={tableHead}>
                                <TableRow >
                                    <TableCell align='left' sx={[cellName, tableCell]} >Name</TableCell>
                                    <TableCell align='left' sx={[cellPrice, tableCell]}>Price</TableCell>
                                    <TableCell align='left' sx={[cellQuantity, tableCell]}>Quantity</TableCell>
                                    <TableCell align='left' sx={tableCell}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align='left' colSpan={4}>
                                    <Box>
                                        <Grid2 container sx={centerAlignment} spacing={1}>
                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                <ExtensionOffIcon sx={noItemIcon} />
                                            </Grid2>
                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                <GlobalBlackHeader5 text='No Records Found' />
                                            </Grid2>
                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                <GlobalGreyBody2 text={`Order Some Food in the Menu Section.`} />
                                            </Grid2>
                                        </Grid2>
                                    </Box>
                                </TableCell>
                                <TableRow >
                                    <TableCell align='left' colSpan={4}>
                                        <Box>
                                            <GlobalBlackHeader6 sx={totalMessage} text='Total:' />
                                            <GlobalPinkHeader6 sx={totalAmount} text='$0' />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={paymentMethod}>
                        <GlobalBlackHeader4 text='Payment Method' />
                    </Box>
                    <RadioGroup defaultValue='Cash'>
                        <List sx={paymentMethodList} >
                            {PaymentMethodList.map((paymentMethod) => (
                                <ListItem key={paymentMethod.id} sx={paymentMethodListItem} >
                                    <Radio overlay value={paymentMethod.id} label={<><GlobalBlackBody1 text={paymentMethod.paymentName} /><GlobalGreyBody1 text={paymentMethod.desc} /></>} sx={radioAlignment}
                                        slotProps={{
                                            action: ({ checked }) => ({
                                                sx: (theme) => ({
                                                    ...(checked && {
                                                        zIndex: -1, border: '2px solid', borderColor: blue[700]
                                                    }),
                                                }),
                                            }),
                                        }} />
                                </ListItem>
                            ))}
                        </List>
                    </RadioGroup>

                    <Grid2 container sx={confirmContainer} justifyContent='center'>
                        <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                            <ConfirmPaymentModal sx={confirmBtn} text='Bill Out' variant='contained' context={'Are you sure do you want to Bill Out?'} disabled={true} />
                        </Grid2>
                    </Grid2>
                </Box>
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Receipt' />
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead sx={tableHead}>
                            <TableRow >
                                <TableCell align='left' sx={[cellName, tableCell]} >Name</TableCell>
                                <TableCell align='left' sx={[cellPrice, tableCell ]}>Price</TableCell>
                                <TableCell align='left' sx={[cellQuantity, tableCell ]}>Quantity</TableCell>
                                <TableCell align='left' sx={tableCell}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowItem.map((row) => (
                                <TableRow key={row.item_name} sx={tableRow} >
                                    <TableCell align='left'>{row.item_name}</TableCell>
                                    <TableCell align='left'>{'$' + row.item_price.$numberDecimal}</TableCell>
                                    <TableCell align='left'>{row.quantity}</TableCell>
                                    <TableCell align='left'>{'$' + 
                                        (row.item_price.$numberDecimal * row.quantity).toFixed(2)
                                    }</TableCell>
                                </TableRow>
                            ))}
                            <TableRow >
                                <TableCell align='left' colSpan={4}>
                                    <Box>
                                        <GlobalBlackHeader6 sx={totalMessage} text='Total:' />
                                        <GlobalPinkHeader6 sx={totalAmount} text={
                                            '$' +
                                            (rowItem.reduce((acc, item) => {
                                                return acc + (item.item_price.$numberDecimal * item.quantity)
                                            }, 0)).toFixed(2)
                                        } />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={paymentMethod}>
                    <GlobalBlackHeader4 text='Payment Method' />
                </Box>
                <RadioGroup defaultValue='Cash'>
                    <List sx={ paymentMethodList } >
                        {PaymentMethodList.map((paymentMethod) => (
                            <ListItem key={paymentMethod.id} sx={ paymentMethodListItem } >
                                <Radio overlay value={paymentMethod.id} label={<><GlobalBlackBody1 text={paymentMethod.paymentName} /><GlobalGreyBody1 text={paymentMethod.desc} /></>} sx={ radioAlignment }
                                    slotProps={{
                                        action: ({ checked }) => ({
                                            sx: (theme) => ({ ...(checked && {  zIndex: -1,  border: '2px solid', borderColor: blue[700]
                                                }),
                                            }),
                                        }),
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </RadioGroup>

                <Grid2 container sx={confirmContainer} justifyContent='center'>
                    <Grid2 sx={confirmBtn} item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <ConfirmPaymentModal sx={confirmBtn} text='Bill Out' variant='contained' context={'Are you sure do you want to Bill Out?'} disabled={false}/>
                    </Grid2>
                </Grid2>
            </Box>
        </React.Fragment>
    );
}

export default Payment; 