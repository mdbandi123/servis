import React from "react";

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { pink, red, green, blue } from "@mui/material/colors";

import GlobalPurpleHeader4 from "../../global/typographies/headers/PurpleHeader4";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import GlobalBlackBody1 from "../../global/typographies/bodies/BlackBody1";
import GlobalGreyBody2 from "../../global/typographies/bodies/GreyBody2";
import GlobalGreyBody3 from "../../global/typographies/bodies/GreyBody3";

const DummyCustomersPayments = [
    {
        userTableId: `#`+Math.floor(Math.random() * 100000),
        userTableName: 'Table #1',
        userTableOrder: 12,
        totalAmount: `$`+32,
        dateOrder: new Date(2022, 5, 20),
        userTableColor: red[900],
    },
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: 'Table #2',
        userTableOrder: 23,
        totalAmount: `$` + 45.50,
        dateOrder: new Date(2022, 6, 25),
        userTableColor: pink[900],
    },
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: 'Table #3',
        userTableOrder: 45,
        totalAmount: `$` + 33,
        dateOrder: new Date(2022, 9, 8),
        userTableColor: green[900],
    },
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: 'Table #4',
        userTableOrder: 6,
        totalAmount: `$` + 32.10,
        dateOrder: new Date(2022, 9, 29),
        userTableColor: blue[900],
    },
];

function Payment() {
    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    }
    const userTableCardInfo = {
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    }
    const userTableProfile = {
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    }
    
    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text="Payment" />
            </Box>
            <Grid2 container spacing={3}>
                {DummyCustomersPayments.map((paymentList) => (
                    <Grid2 item xs={12} sm={6} md={6} lg={4} lx={4}>
                        <Card sx={{ borderBottom: `4px solid ` + paymentList.userTableColor }}>
                            <CardActionArea>
                                <CardContent>
                                    <Grid2 container sx={userTableProfile}>
                                        <Grid2 item xs={12} sm={12} md={3} lg={3} lx={3}>
                                            <AccountCircleIcon sx={{ color: paymentList.userTableColor, fontSize: '4em' }} />
                                        </Grid2>
                                        <Grid2 item xs={12} sm={12} md={9} lg={9} lx={9}>
                                            <GlobalBlackHeader5 text={paymentList.userTableName} />
                                            <GlobalGreyBody2 text={paymentList.userTableId} />
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 container sx={userTableCardInfo}>
                                        <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                                            <GlobalGreyBody3 text="DATE OF ORDER" />
                                            <GlobalBlackBody1 text={[paymentList.dateOrder.getMonth()+'/', paymentList.dateOrder.getDate()+'/', paymentList.dateOrder.getFullYear()] } />
                                        </Grid2>
                                        <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                                            <GlobalGreyBody3 text="TOTAL ORDERS" />
                                            <GlobalBlackBody1 text={paymentList.userTableOrder} />
                                        </Grid2>
                                        <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                                            <GlobalGreyBody3 text="TOTAL AMOUNT" />
                                            <GlobalBlackBody1 text={paymentList.totalAmount} />
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </React.Fragment>
    );
}

export default Payment;
