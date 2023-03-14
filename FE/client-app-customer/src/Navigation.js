import * as React from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useScrollTrigger, Stack, Box, Paper, Avatar } from "@mui/material/";
import {
    BottomNavigation,
    BottomNavigationAction,
    AppBar,
    Toolbar,
} from "@mui/material/";
import { teal, orange, grey } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import GlobalWhiteHeader6 from "./global/typographies/headers/WhiteHeader6";
import GlobalTealBadge from "./global/badges/TealBadge";

import store from "./store/store";

function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Navigation(props) {
    const [value, setValue] = useState("menu");
    const navigate = useNavigate();

    const { setCartItems, orderedItems, setOrderedItems } = store();

    const table_number = store((state) => state.table_number);
    const order_id = store((state) => state.order_id);
    const cartItems = store((state) => state.cartItems);

    const pendingItems = orderedItems.filter(
        (item) => item.status !== "served"
    );

    React.useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/order_items/cart/${
                order_id || localStorage.getItem("order_id")
            }`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/order_items/items/${
                order_id || localStorage.getItem("order_id")
            }`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setOrderedItems(data.items);
                } else {
                    console.log(data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const navigation = {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    };

    const avatar = {
        bgcolor: grey[500],
    };

    const navigationSelector = {
        "&.Mui-selected": {
            color: orange[700],
        },
    };

    const appBar = {
        backgroundColor: orange[700],
    };

    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar sx={appBar}>
                    <Toolbar>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box>
                                <Avatar sx={avatar} />
                            </Box>
                            <Box>
                                <GlobalWhiteHeader6 text={`${table_number}`} />
                            </Box>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Outlet />
            <Paper sx={navigation} elevation={10}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, value) => setValue(value)}
                >
                    <BottomNavigationAction
                        sx={navigationSelector}
                        onClick={() => navigate("/")}
                        label="Menu"
                        value="menu"
                        icon={<AssignmentIcon />}
                    />
                    <BottomNavigationAction
                        sx={navigationSelector}
                        onClick={() => navigate("/cart")}
                        label="Cart"
                        value="cart"
                        icon={
                            <GlobalTealBadge
                                badgeContent={cartItems ? cartItems.length : 0}
                                max="9"
                                overlap="circular"
                            >
                                <ShoppingCartIcon />{" "}
                            </GlobalTealBadge>
                        }
                    />
                    <BottomNavigationAction
                        sx={navigationSelector}
                        onClick={() => navigate("/pending")}
                        label="Pending"
                        value="pending"
                        icon={
                            <GlobalTealBadge
                                badgeContent={
                                    pendingItems ? pendingItems.length : 0
                                }
                                max="9"
                                overlap="circular"
                            >
                                <PendingActionsIcon />
                            </GlobalTealBadge>
                        }
                    />
                    <BottomNavigationAction
                        sx={navigationSelector}
                        onClick={() => navigate("/payment")}
                        label="Payment"
                        value="payment"
                        icon={<PaymentIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </React.Fragment>
    );
}
