import React from 'react';
// import { PaymentData } from './datas/PaymentData';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';

import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlackHeader3 from '../../global/typographies/headers/BlackHeader3';
import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalGreyBody3 from '../../global/typographies/bodies/GreyBody3';
import ViewPaymentModal from '../../global/modals/ViewPaymentModal';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';

function Payment() {

    const [PaymentData, setPaymentData] = React.useState([]);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.orders)
                setPaymentData(data.orders)
            })
            .catch((error) => console.error(error));
    }, []);

    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    };

    const userTableCardInfo = {
        textAlign: { xs: 'left', sm: 'left', md: 'center', lg: 'center', lx: 'center' }
    };

    const userTableProfile = {
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    };

    const userTableIcon = {
        fontSize: '4em'
    }

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const noItemIcon = {
        fontSize: '8em'
    };

    if (PaymentData.length === 0) {
        return (
            <React.Fragment>
                <Box sx={ pageTitleContainer }>
                    <GlobalPurpleHeader4 text='Payment' />
                </Box>
                <Grid2 container sx={ centerAlignment } spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <PersonOffTwoToneIcon sx={noItemIcon} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader3 text='No User Found' />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2 text={`We couldn't find any Users. Try to create Users`} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlueContainedButton text='Create' />
                    </Grid2>
                </Grid2>
            </React.Fragment>
        );
    };
    return (
        <React.Fragment>
            <Box sx={ pageTitleContainer }>
                <GlobalPurpleHeader4 text='Payment' />
            </Box>
            <Grid2 container spacing={3}>
            {PaymentData.map((paymentList) => {
                const date = new Date(paymentList.session_start);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const year = date.getFullYear();
                const hour = date.getHours();
                const minute = date.getMinutes();

                return (
                <Grid2 item xs={12} sm={6} md={6} lg={4} lx={4}>
                    <Card sx={{ borderBottom: `4px solid ` + paymentList.userTableColor }}>
                    <ViewPaymentModal
                        title={paymentList.table_number}
                        userId={paymentList.order_id}
                        orderDate={[month + "/" + day + "/" + year]}
                        orderTime={[hour + ":" + minute]}
                        sx={{ color: paymentList.userTableColor, fontSize: "2em" }}
                        ordered_items={paymentList.ordered_items}
                    >
                        <CardContent>
                        <Grid2 container sx={userTableProfile}>
                            <Grid2 item xs={12} sm={12} md={3} lg={3} lx={3}>
                            <AccountCircleIcon sx={[{ color: paymentList.userTableColor }, userTableIcon]} />
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={9} lg={9} lx={9}>
                            <GlobalBlackHeader5 text={"Table: "+paymentList.table_number} />
                            <GlobalGreyBody2 text={paymentList.order_id} />
                            </Grid2>
                        </Grid2>
                        <Grid2 container sx={userTableCardInfo}>
                            <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                            <GlobalGreyBody3 text="DATE OF ORDER" />
                            <GlobalBlackBody1 text={[month + "/" + day + "/" + year]} />
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                            <GlobalGreyBody3 text="TOTAL ORDERS" />
                            <GlobalBlackBody1 text={ paymentList.ordered_items.length } />
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                            <GlobalGreyBody3 text="TOTAL AMOUNT" />
                            <GlobalBlackBody1 text={ paymentList.ordered_items.reduce((sum, item) => sum + item.total_price, 0)} />
                            </Grid2>
                        </Grid2>
                        </CardContent>
                    </ViewPaymentModal>
                    </Card>
                </Grid2>
                );
            })}
            </Grid2>
        </React.Fragment>
    );
};

export default Payment;
