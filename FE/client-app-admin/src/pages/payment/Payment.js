import React from "react";
import { useStore } from "../../store/store";

import { motion, AnimatePresence } from 'framer-motion';
import { grey, teal, orange } from "@mui/material/colors";
import { Box, Card, CardContent, Badge } from "@mui/material/";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";

import GlobalIndigoHeader4 from "../../global/typographies/headers/IndigoHeader4";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import GlobalBlackHeader3 from "../../global/typographies/headers/BlackHeader3";
import GlobalBlackBody1 from "../../global/typographies/bodies/BlackBody1";
import GlobalGreyBody2 from "../../global/typographies/bodies/GreyBody2";
import GlobalGreyBody3 from "../../global/typographies/bodies/GreyBody3";
import ViewPaymentModal from "../../global/modals/ViewPaymentModal";
import SlideDown from "../../animation/SlideDown";

import PaymentSkeleton from "../../skeletons/PaymentSkeleton";

function Payment(props) {
    const [loading, setLoading] = React.useState(true);
    const { setOrderedItems, user } = useStore();
    const PaymentData = useStore.getState().orderedItems || [];

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.Aa,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    console.log(data.orders);
                    // setTimeout(() => {
                    //     setLoading(false)
                    // }, 3000);
                    setOrderedItems(data.orders);
                    setLoading(false);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const pageTitleContainer = {
        mb: 3,
        textAlign: {
            xs: "center",
            sm: "center",
            md: "left",
            lg: "left",
            lx: "left",
        },
    };

    const userTableCardInfo = {
        textAlign: {
            xs: "left",
            sm: "left",
            md: "center",
            lg: "center",
            lx: "center",
        },
    };

    const userTableProfile = {
        textAlign: {
            xs: "center",
            sm: "center",
            md: "left",
            lg: "left",
            lx: "left",
        },
    };

    const userTableIcon = {
        fontSize: "4em",
        color: grey[800],
    };

    const centerAlignment = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    };

    const noItemIcon = {
        fontSize: "8em",
    };

    const badgePayment = {
        "& .MuiBadge-badge": {
            color: teal[400],
            backgroundColor: teal[400],
        },
    };

    const userIcon = {
        color: grey[800],
        fontSize: "2.5em",
    };

    const paymentCard = {
        borderBottom: `4px solid ` + orange[700],
    };

    if (PaymentData.length === 0) {
        return (
            <SlideDown>
                <Box sx={pageTitleContainer}>
                    <GlobalIndigoHeader4 text="Payment" />
                </Box>

                    {
                        loading ? (
                            <Grid2 container spacing={3}>
                                <PaymentSkeleton />
                            </Grid2>
                        ) : (
                            <Grid2 container sx={centerAlignment} >
                                <Grid2 container sx={centerAlignment} spacing={1}>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <CreditCardOffIcon sx={noItemIcon} />
                                    </Grid2>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <GlobalBlackHeader3 text={ `No Payments list Found` } />
                                    </Grid2>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <GlobalGreyBody2
                                            text={`We couldn't find any orders for billout. Please wait for customers to request billout.`}
                                        />
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                        )
                    }

            </SlideDown>
        );
    }

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text="Payment" />
            </Box>
            <Grid2 container spacing={3}>
                {
                    loading ? (
                        <PaymentSkeleton />
                    ) : (
                        <>
                            {PaymentData.sort((a, b) => b.billed_out - a.billed_out).map(
                                (paymentList) => {
                                    const date = new Date(paymentList.session_start);
                                    const month = date.getMonth() + 1;
                                    const day = date.getDate();
                                    const year = date.getFullYear();
                                    const hour = date.getHours();
                                    const minute = date.getMinutes();

                                    return (
                                        <Grid2
                                            item
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            lg={4}
                                            lx={4}
                                            justifyContent="space-around"
                                        >
                                            <AnimatePresence>
                                            <motion.div layout key={paymentList.order_id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}>
                                            <Card sx={paymentCard}>
                                                <ViewPaymentModal
                                                    orderId={paymentList.order_id}
                                                    title={paymentList.table_number}
                                                    userId={paymentList.order_id}
                                                    orderDate={[
                                                        month + "/" + day + "/" + year,
                                                    ]}
                                                    orderTime={[hour + ":" + minute]}
                                                    sx={userIcon}
                                                    ordered_items={
                                                        paymentList.ordered_items
                                                    }
                                                >
                                                    <CardContent>
                                                        <Grid2
                                                            container
                                                            sx={userTableProfile}
                                                        >
                                                            <Grid2
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                md={3}
                                                                lg={3}
                                                                lx={3}
                                                            >
                                                                {paymentList.billed_out ? (
                                                                    <>
                                                                        <Badge
                                                                            badgeContent={1}
                                                                            overlap="circular"
                                                                            sx={
                                                                                badgePayment
                                                                            }
                                                                        >
                                                                            <CreditCardIcon
                                                                                sx={
                                                                                    userTableIcon
                                                                                }
                                                                            />
                                                                        </Badge>
                                                                    </>
                                                                ) : (
                                                                    <CreditCardIcon
                                                                        sx={userTableIcon}
                                                                    />
                                                                )}
                                                            </Grid2>
                                                            <Grid2
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                md={9}
                                                                lg={9}
                                                                lx={9}
                                                            >

                                                                <GlobalBlackHeader5
                                                                    text={
                                                                        paymentList.table_number
                                                                    }

                                                                    sx={{marginTop:'3%', marginLeft: '-7%'}}
                                                                />
                                                                {/* <GlobalGreyBody2
                                                                    text={
                                                                        paymentList.order_id
                                                                    }
                                                                /> */}
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2
                                                            container
                                                            sx={userTableCardInfo}
                                                        >
                                                            <Grid2
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                md={4}
                                                                lg={4}
                                                                lx={4}
                                                            >
                                                                <GlobalGreyBody3
                                                                    text={`DATE OF ORDER`}
                                                                />
                                                                <GlobalBlackBody1
                                                                    text={`${month}/${day}/${year}`}
                                                                />
                                                            </Grid2>
                                                            <Grid2
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                md={4}
                                                                lg={4}
                                                                lx={4}
                                                            >
                                                                <GlobalGreyBody3
                                                                    text={`TOTAL ORDERS`}
                                                                />
                                                                <GlobalBlackBody1
                                                                    text={paymentList.ordered_items.reduce(
                                                                        (sum, item) =>
                                                                            sum +
                                                                            item.quantity,
                                                                        0
                                                                    )}
                                                                />
                                                            </Grid2>
                                                            <Grid2
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                                md={4}
                                                                lg={4}
                                                                lx={4}
                                                            >
                                                                <GlobalGreyBody3
                                                                    text={`TOTAL AMOUNT`}
                                                                />
                                                                <GlobalBlackBody1
                                                                    text={`₱${paymentList.ordered_items.reduce(
                                                                        (sum, item) =>
                                                                            sum +
                                                                            item.quantity *
                                                                                item
                                                                                    .item_price
                                                                                    .$numberDecimal,
                                                                        0
                                                                    )}`}
                                                                />
                                                            </Grid2>
                                                        </Grid2>
                                                    </CardContent>
                                                </ViewPaymentModal>
                                            </Card>
                                        </motion.div>
                                        </AnimatePresence>
                                    </Grid2>
                                    );
                                }
                            )}
                        </>
                    )
                }
                

            </Grid2>
        </SlideDown>
    );
}

export default Payment;
