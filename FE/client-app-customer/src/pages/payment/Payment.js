import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GlobalBlackHeader4 from '../../global/typographies/headers/BlackHeader4';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import { Box, Stack } from '@mui/system';
import GlobalPinkBody2 from '../../global/typographies/bodies/PinkBody2';

import GlobalGreyCaption2 from '../../global/typographies/captions/GreyCaption2';
import { blue } from '@mui/material/colors';
import { Card, CardActionArea, CardActions, CardMedia } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { PaymentMethodList } from './data/PaymentMethodList';

function createData(name, price, quantity, total) {
    return { name, price, quantity, total };
}

const rows = [
    createData('Pork Tonkatsu', 145, 10, 1450),
    createData('Mango Pudding', 237, 33, 12312),
    createData('Wine Braise Beef', 262, 31, 2312),
    createData('PikePerch Fillet', 305, 32, 2321),
    createData('Fried Chicken', 356, 2, 2321),
];

function Payment() {
    const headerPage = {
        pb: 2,
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const paymentMethod = {
        pt: 3,
        pb: 2,
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 2,
    };

    const foodImage = {
        width: 120,
        height: 120,
        p: 1
    };

    const foodContent = {
        ml: 1.4
    };

    const foodName = {
        fontSize: '1.1em'
    };

    const foodStatus = {
        ml: 1.4,
        color: blue[900]
    };
    
    return (
        <React.Fragment>
            <Box sx={pageContainer}>
                <Box sx={headerPage}>
                    <GlobalBlackHeader4 text='Receipt' />
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="left" sx={{ width: "40%" }}>Name</TableCell>
                                <TableCell align="left" sx={{ width: "20%" }}>Price</TableCell>
                                <TableCell align="left" sx={{ width: "5%" }}>Quantity</TableCell>
                                <TableCell align="left" >Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left">{row.quantity}</TableCell>
                                    <TableCell align="left">{row.total}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow >
                                <TableCell align="left" colSpan={4}>Total: 1237</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={paymentMethod}>
                    <GlobalBlackHeader4 text='Payment Method' />
                </Box>
                {PaymentMethodList.map((paymentMethod) => (
                <Card>
                    <CardActionArea>
                        <Grid2 container spacing={1} alignItems="center">
                            <Grid2 item>
                                    <CardMedia sx={foodImage} component="img" image={paymentMethod.image} alt="Live from space album cover" />
                            </Grid2>
                            <Grid2 item>
                                <Stack sx={foodContent} direction='row' alignItems="center" spacing={1}>
                                    <GlobalBlackHeader5 text={paymentMethod.paymentName} />
                                </Stack>
                                <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
                                    <GlobalPinkBody2 sx={foodStatus} text={paymentMethod.desc} />
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </CardActionArea>
                </Card>
                ))}
            </Box>
        </React.Fragment>
    );
}

export default Payment; 