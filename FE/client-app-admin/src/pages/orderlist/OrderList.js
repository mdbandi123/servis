import * as React from "react";
import { useStore } from "../../store/store.js";

import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material/";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MuiDrawer from "@mui/material/Drawer";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material/";
import {
    AppBar,
    Divider,
    Card,
    CardContent,
    Typography,
    CssBaseline,
} from "@mui/material";
import { teal, grey, orange } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import NoFoodIcon from '@mui/icons-material/NoFood';

import GlobalGreyCaption1 from "../../global/typographies/captions/GreyCaption1";
import GlobalGreyCaption2 from "../../global/typographies/captions/GreyCaption2";
import GlobalIndigoHeader4 from "../../global/typographies/headers/IndigoHeader4";
import GlobalBlackBody1 from "../../global/typographies/bodies/BlackBody1";
import GlobalBlackBody2 from "../../global/typographies/bodies/BlackBody2";
import GlobalGreyBody2 from "../../global/typographies/bodies/GreyBody2";
import GlobalTealBadge from "../../global/badges/TealBadge";
import ViewOrderModal from "../../global/modals/ViewOrderModal";
import GlobalBlackHeader3 from "../../global/typographies/headers/BlackHeader3";
import GlobalTealContainedButton from "../../global/buttons/contains/TealContainedButton";
import GlobalBlackHeader6 from "../../global/typographies/headers/BlackHeader6";
import SlideDown from "../../animation/SlideDown";

import OrdersSkeleton from "../../skeletons/OrdersSkeleton.js";

import {Skeleton} from "@mui/material/";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: "25%",
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 10px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

function OrderList() {
    const [loading, setLoading] = React.useState(true);
    const { setOrderedItems, user } = useStore.getState();
    const orderListNotification = useStore.getState().orderedItems || [];

    const [open, setOpen] = React.useState(true);

    const [openNotificationAppBar, setOpenNotificationAppBar] =
        React.useState(true);

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
                // console.log('data.orders',data.orders);
                // setTimeout(() => {
                //     setLoading(false)
                // }, 3000);
                setOrderedItems(data.orders);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleClick = () => {
        setOpenNotificationAppBar(!openNotificationAppBar);
    };

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

    const displayFlexContainer = {
        display: "flex",
    };

    const notificationAppBar = {
        backgroundColor: grey[50],
    };

    const notificationHeader = {
        mt: 8,
    };

    const notificationListItem = {
        display: "block",
    };

    const notificationItemButton = {
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
    };

    const notificationItemIcon = {
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
    };

    const notificationOpenHandler = {
        backgroundColor: "rgba(0, 105, 92, 0.4)",
        fontSize: "2em",
        color: teal[900],
        borderRadius: "50%",
        textAlign: "center",
    };

    const notificationUserPhoto = {
        fontSize: "2.1em",
        color: grey[800],
    };

    const notificationTitle = {
        textAlign: "center",
    };

    const notificationTitleText = {
        opacity: open ? 1 : 0,
        color: teal[900],
        fontSize: "1.5em",
    };

    const notificationOrderContent = {
        opacity: open ? 1 : 0,
    };

    const notificationUserName = {
        fontSize: "1.1em",
    };

    const userTableIcon = {
        fontSize: "2.5em",
        color: grey[800],
    };

    const orderListCard = {
        p: 0,
        minWidth: 250,
        maxWidth: 250,
        height: 150,
        flexGrow: 1,
        mr: 1,
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

    const orderListUsername = {
        marginTop:'.25em',
        fontSize: "1.4em"
    };

    const userIconNotification = {
        fontSize: "2em",
        color: grey[800]
    };

    const orderListCardContainer = {
        borderBottom: `4px solid ` + orange[700],
    };

    const skeleton = {
        bgColor: {
            backgroundColor: grey[400],
        }
    }

    if (orderListNotification.length === 0) {
        return (
            <React.Fragment>
                <Box sx={displayFlexContainer}>
                    <SlideDown>
                        <Box component="main">
                            <Box sx={pageTitleContainer}>
                                <GlobalIndigoHeader4 text="Order Board" />
                            </Box>

                                {
                                    loading ? (
                                        <Grid2 container spacing={1} alignItems="baseline">
                                            <OrdersSkeleton />
                                        </Grid2>
                                    ) : (
                                        <Grid2 container sx={centerAlignment}>
                                            <Grid2 container sx={centerAlignment} spacing={1}>
                                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12} >
                                                    <NoFoodIcon sx={noItemIcon} />
                                                </Grid2>
                                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12} >
                                                    <GlobalBlackHeader3 text="No Running Orders" />
                                                </Grid2>
                                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12} >
                                                    <GlobalGreyBody2 text={`We were unable to find any Orders. Please wait for customers to orders.`} />
                                                </Grid2>
                                            </Grid2>
                                        </Grid2>
                                    )
                                }

                        </Box>
                    </SlideDown>
                    <CssBaseline />
                    <Drawer
                        variant="permanent"
                        open={openNotificationAppBar}
                        anchor="right"
                    >
                        <AppBar position="sticky" sx={notificationAppBar}>
                            <List sx={notificationHeader}>
                                <ListItem
                                    disablePadding
                                    sx={notificationListItem}
                                >
                                    <ListItemButton
                                        onClick={handleClick}
                                        sx={[notificationItemButton]}
                                    >
                                        <ListItemIcon sx={notificationItemIcon}>
                                            {openNotificationAppBar ? (
                                                <ChevronRightIcon
                                                    sx={notificationOpenHandler}
                                                />
                                            ) : (
                                                <ChevronLeftIcon
                                                    sx={notificationOpenHandler}
                                                />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={notificationTitle}
                                            disableTypography
                                            primary={
                                                <Typography
                                                    sx={notificationTitleText}
                                                    variant="body1"
                                                >
                                                    Notification
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </AppBar>
                        <Divider />
                        {
                            loading ? (
                                <>
                                    {Array.from(new Array(5)).map(() => (
                                        <>
                                            <ListItem disablePadding sx={notificationListItem} >
                                                <ListItemButton sx={notificationItemButton} >
                                                    <ListItemIcon sx={notificationItemIcon} >
                                                        <Skeleton sx={skeleton.bgColor} variant='rounded' height={35} width={35} animation='wave' />
                                                    </ListItemIcon>
                                                    <Stack direction="column" justifyContent="flex-start" spacing={1} >
                                                        <Stack direction="row">
                                                            <Box>
                                                                <Skeleton sx={skeleton.bgColor} variant='rounded' height={25} width={200} animation='wave' />
                                                            </Box>
                                                        </Stack>
                                                        <Stack direction="row">
                                                            <Box>
                                                                <Skeleton sx={skeleton.bgColor} variant='rounded' height={15} width={200} animation='wave' />
                                                            </Box>
                                                        </Stack>
                                                        <Box alignItems="flex-end">
                                                            <ListItemText sx={notificationOrderContent} primary={<Skeleton sx={skeleton.bgColor} variant='rounded' height={10} width={200} animation='wave' />} />
                                                        </Box>
                                                    </Stack>
                                                </ListItemButton>
                                                <Divider />
                                            </ListItem>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <ListItem disablePadding sx={notificationListItem} >
                                        <ListItemButton sx={[notificationItemButton, {cursor: 'default'}]} >
                                            <ListItemIcon sx={notificationItemIcon} >
                                                <Box sx={{ width: 30, height: 25 }} />
                                            </ListItemIcon>
                                            <ListItemText sx={notificationTitle} disableTypography primary={
                                                <GlobalBlackBody1 sx={notificationUserName} text={'No Notifications Found'} />
                                            }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )
                        }
                    </Drawer>
                </Box>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Box sx={displayFlexContainer}>
                <SlideDown>
                    <Box component="main">
                        <Box sx={pageTitleContainer}>
                            <GlobalIndigoHeader4 text="Order Board" />
                        </Box>
                        <Grid2 container spacing={1} alignItems="baseline">

                            {
                                loading ? (
                                    <OrdersSkeleton />
                                ) : (
                                    <>
                                        {orderListNotification
                                            .sort((a, b) =>
                                                new Date(a.session_start) -
                                                new Date(b.session_start)
                                            )
                                            .map((notificationItem) => (
                                                <Grid2 sx={orderListCard} item xs={12} sm={6} md={6} lg={4} lx={4} >
                                                    {console.log(notificationItem)}
                                                    <AnimatePresence>
                                                        <motion.div layout key={notificationItem.order_id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}>
                                                            <Card sx={orderListCardContainer}>
                                                                <ViewOrderModal orders={notificationItem} title={notificationItem.table_number} userId={notificationItem.order_id} sx={userTableIcon} >
                                                                    <CardContent>
                                                                        <Grid2 container spacing={1}>
                                                                            <Grid2 item>
                                                                                <GlobalTealBadge
                                                                                    badgeContent={
                                                                                        notificationItem.ordered_items.filter(
                                                                                            (
                                                                                                orderedItem
                                                                                            ) =>
                                                                                                orderedItem.status !== "served"
                                                                                        ).length
                                                                                    }
                                                                                    overlap="circular"
                                                                                    max={9}
                                                                                >
                                                                                    <FastfoodIcon
                                                                                        sx={userTableIcon} />
                                                                                </GlobalTealBadge>
                                                                            </Grid2>
                                                                            <Grid2 item xs={12} sm container >
                                                                                <Grid2 item xs container direction="column" spacing={2} >
                                                                                    <Grid2 item xs>
                                                                                        <Stack direction="row" alignItems="center" spacing={2} >
                                                                                            <GlobalBlackHeader6 sx={orderListUsername} text={notificationItem.table_number} />
                                                                                        </Stack>
                                                                                        {/* <GlobalGreyCaption2 text={ notificationItem.order_id } /> */}
                                                                                    </Grid2>
                                                                                    <Grid2 item>
                                                                                        <GlobalGreyCaption1
                                                                                            text={[
                                                                                                new Date(notificationItem.session_start).getMonth() + 1 + "-",
                                                                                                new Date(notificationItem.session_start).getDate() + "-",
                                                                                                new Date(notificationItem.session_start).getFullYear() + " | " +
                                                                                                new Date(notificationItem.session_start).getHours() + ":" +
                                                                                                new Date(notificationItem.session_start).getMinutes() + ":" +
                                                                                                new Date(notificationItem.session_start).getSeconds(),
                                                                                            ]}
                                                                                        />
                                                                                    </Grid2>
                                                                                </Grid2>
                                                                                <Grid2 item />
                                                                            </Grid2>
                                                                        </Grid2>
                                                                    </CardContent>
                                                                </ViewOrderModal>
                                                            </Card>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </Grid2>
                                            ))}
                                    </>
                                )
                            }
                            

                        </Grid2>
                    </Box>
                </SlideDown>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    open={openNotificationAppBar}
                    anchor="right"
                >
                    <AppBar position="sticky" sx={notificationAppBar}>
                        <List sx={notificationHeader}>
                            <ListItem disablePadding sx={notificationListItem}>
                                <ListItemButton
                                    onClick={handleClick}
                                    sx={[notificationItemButton]}
                                >
                                    <ListItemIcon sx={notificationItemIcon}>

                                        {
                                            loading ? (
                                                <>
                                                    {openNotificationAppBar ? (
                                                        <ChevronRightIcon sx={notificationOpenHandler} />
                                                    ) : (
                                                        <ChevronLeftIcon sx={notificationOpenHandler} />
                                                    )}
                                                </>
                                            ) : (
                                                <GlobalTealBadge
                                                    badgeContent={
                                                        orderListNotification
                                                            .map((item) =>
                                                                item.ordered_items.filter(
                                                                    (item) =>
                                                                        item.status !== "served"
                                                                )
                                                            ).flat().length
                                                    }
                                                >
                                                    {openNotificationAppBar ? (
                                                        <ChevronRightIcon sx={notificationOpenHandler} />
                                                    ) : (
                                                        <ChevronLeftIcon sx={notificationOpenHandler} />
                                                    )}
                                                </GlobalTealBadge>
                                            )
                                        }

                                    </ListItemIcon>
                                    <ListItemText
                                        sx={notificationTitle}
                                        disableTypography
                                        primary={
                                            <Typography
                                                sx={notificationTitleText}
                                                variant="body1"
                                            >
                                                {
                                                    orderListNotification
                                                        .map((item) =>
                                                            item.ordered_items.filter(
                                                                (item) =>
                                                                    item.status !== "served"
                                                            )
                                                        ).flat().length > 1 ? (
                                                        <>
                                                            Notifications
                                                        </>
                                                    ) : (
                                                        <>
                                                            Notification
                                                        </>
                                                    )
                                                }
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </AppBar>
                    <Divider />

                    {
                        loading ? (
                           <>
                                {Array.from(new Array(5)).map(() => (
                                    <>
                                        <ListItem disablePadding sx={notificationListItem} >
                                            <ListItemButton sx={notificationItemButton} >
                                                <ListItemIcon sx={notificationItemIcon} >
                                                    <Skeleton sx={skeleton.bgColor} variant='rounded' height={35} width={35} animation='wave' />
                                                </ListItemIcon>
                                                <Stack direction="column" justifyContent="flex-start" spacing={1} >
                                                    <Stack direction="row">
                                                        <Box>
                                                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={25} width={200} animation='wave' />
                                                        </Box>
                                                    </Stack>
                                                    <Stack direction="row">
                                                        <Box>
                                                            <Skeleton sx={skeleton.bgColor} variant='rounded' height={15} width={200} animation='wave' />
                                                        </Box>
                                                    </Stack>
                                                    <Box alignItems="flex-end">
                                                        <ListItemText sx={notificationOrderContent} primary={<Skeleton sx={skeleton.bgColor} variant='rounded' height={10} width={200} animation='wave' />} />
                                                    </Box>
                                                </Stack>
                                            </ListItemButton>
                                            <Divider />
                                        </ListItem>
                                    </>
                                ))}
                           </>
                        ) : (
                            <>
                                {orderListNotification.map((notificationItem) =>
                                    notificationItem.ordered_items
                                        .filter((item) => item.status !== "served")
                                        .map((filteredItem) => (
                                            <AnimatePresence>
                                                <motion.div layout key={notificationItem.order_id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}>
                                                    <ListItem disablePadding sx={notificationListItem} >
                                                        <ViewOrderModal orders={notificationItem} title={notificationItem.table_number} userId={notificationItem.order_id} sx={userIconNotification} date={[
                                                            new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getMonth() + 1 + '-' +
                                                            new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getDate() + '-' +
                                                            new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getFullYear() + ' | ' +
                                                            new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getHours() + ':' +
                                                            new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getMinutes() + ':' +
                                                            new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getSeconds()
                                                        ]} >
                                                            <ListItemButton sx={notificationItemButton} >
                                                                <ListItemIcon sx={notificationItemIcon} >
                                                                    <GlobalTealBadge
                                                                        badgeContent={filteredItem.quantity}
                                                                        max={9}
                                                                    >
                                                                        <FastfoodIcon sx={notificationUserPhoto} />
                                                                    </GlobalTealBadge>
                                                                </ListItemIcon>
                                                                <Stack direction="column" justifyContent="flex-start" spacing={-1} >
                                                                    <Stack direction="row">
                                                                        <Box>
                                                                            <ListItemText sx={notificationOrderContent} primary={<GlobalBlackBody1 sx={notificationUserName} text={notificationItem.table_number} />} />
                                                                        </Box>
                                                                    </Stack>
                                                                    <Stack direction="row">
                                                                        <Box>
                                                                            <ListItemText sx={notificationOrderContent} primary={<GlobalBlackBody2 text={`${filteredItem.item_name}`} />} />
                                                                        </Box>
                                                                    </Stack>
                                                                    <Box alignItems="flex-end">
                                                                        <ListItemText sx={notificationOrderContent}
                                                                            primary={
                                                                                <GlobalGreyCaption2
                                                                                    text={[
                                                                                        new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getMonth() + 1 + '-' +
                                                                                        new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getDate() + '-' +
                                                                                        new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getFullYear() + ' | ' +
                                                                                        new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getHours() + ':' +
                                                                                        new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getMinutes() + ':' +
                                                                                        new Date(new Date(filteredItem.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getSeconds()
                                                                                    ]}
                                                                                />
                                                                            }
                                                                        />
                                                                    </Box>
                                                                </Stack>
                                                            </ListItemButton>
                                                        </ViewOrderModal>
                                                        <Divider />
                                                    </ListItem>
                                                </motion.div>
                                            </AnimatePresence>
                                        ))
                                )}
                            </>
                        )
                    }

                </Drawer>
            </Box>
        </React.Fragment>
    );
}

export default OrderList;
