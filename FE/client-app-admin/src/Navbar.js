import * as React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useStore } from "./store/store";

import { styled, useTheme } from "@mui/material/styles";
import { orange, grey } from "@mui/material/colors";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material/";
import { CssBaseline, IconButton, Avatar } from "@mui/material/";
import { Box, Toolbar, Divider } from "@mui/material/";
import { ExpandLess, ExpandMore } from "@mui/icons-material/";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import ArchiveIcon from "@mui/icons-material/Archive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TableChartIcon from '@mui/icons-material/TableChart';
import LogoutIcon from "@mui/icons-material/Logout";

import GlobalWhiteHeader5 from "./global/typographies/headers/WhiteHeader5";
import GlobalTealBadge from "./global/badges/TealBadge";
import { Stack } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 220;

const openedMixin = (theme) => ({
    backgroundColor: orange[700],
    color: grey[50],
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    backgroundColor: orange[700],
    color: grey[50],
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    backgroundColor: orange[700],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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

function Navbar() {
    const { setOrderedItems, user } = useStore.getState();

    const ordered_items = useStore((state) => state.orderedItems) || [];

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
            method: "GET",
            headers: {
                Authorization: user.Aa,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setOrderedItems(data.orders);
            })
            .catch((error) => console.error(error));
    }, []);

    const theme = useTheme();

    const location = useLocation();
    const path = location.pathname;

    const [openAccordion, setOpenAccordion] = React.useState(true);
    const handleClick = () => {
        setOpenAccordion(!openAccordion);
    };

    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuList1 = [
        { title: "Order Board", path: "/" },
        { title: "Payment", path: "/payment" },
        { title: "Archive", path: "/archive" },
    ];

    const menuList2 = [
        { title: "Table Management", path: "/table-management" },
        { title: "Generate", path: "/generate" },
    ];

    const menulist3 = [{ title: "Signout", path: "/logout" }];

    const accordionList = [
        { title: "Food Items", path: "/fooditems" },
        { title: "Category Items", path: "/categoryitems" },
    ];

    const menuFlexbox = {
        display: "flex",
    };

    const centerMenuIcons = {
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
    };

    const changeIconsColor = {
        color: grey[50],
    };

    const menuIcon = {
        marginRight: 5,
        ...(open && { display: "none" }),
    };

    const drawerCloseIcon = {
        color: grey[50],
        backgroundColor: orange[500],
        "&:hover": {
            backgroundColor: orange[600],
            transition: "0.5s",
        },
    };

    const listItemContainer = {
        display: "block",
    };

    const listItemButtonContainer = {
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
        "&:hover": {
            backgroundColor: orange[800],
            transition: "0.5s",
        },
    };

    const closeItemText = {
        opacity: open ? 1 : 0,
    };

    const mainComponentContainer = {
        flexGrow: 1,
        p: 3,
    };

    const accordionItemButtonContainer = {
        minHeight: 48,
        initial: "center",
        px: 2.5,
        backgroundColor: orange[800],
        "&:hover": {
            backgroundColor: orange[900],
            transition: "0.5s",
        },
    };

    const accordionExpand = {
        position: "absolute",
        right: "2%",
    };

    const adminIcon = {
        fontSize: "2em",
    };

    return (
        <Box sx={menuFlexbox}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Tooltip title={`Open Drawer`} placement="right-start">
                        <IconButton
                            sx={menuIcon}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box>
                            <Avatar sx={adminIcon} src='servis-logo-white.png'/>
                        </Box>
                        <Box>
                            <GlobalWhiteHeader5 text={`Admin Interface`} />
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Tooltip title={`Close Drawer`} placement="right-start">
                        <IconButton
                            onClick={handleDrawerClose}
                            sx={drawerCloseIcon}
                        >
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </Tooltip>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuList1.map((item, index) => (
                        <ListItem
                            disablePadding
                            sx={listItemContainer}
                            key={item.title}
                            component={Link}
                            to={item.path}
                            button
                            selected={item.path === path}
                        >
                            <Tooltip title={item.title} placement="right-start">
                                <ListItemButton sx={listItemButtonContainer}>
                                    <ListItemIcon
                                        sx={[centerMenuIcons, changeIconsColor]}
                                    >
                                        {index === 0 && (
                                            <GlobalTealBadge
                                                badgeContent={
                                                    ordered_items
                                                        .map((item) =>
                                                            item.ordered_items.filter(
                                                                (item) =>
                                                                    item.status !==
                                                                    "served"
                                                            )
                                                        )
                                                        .flat().length
                                                }
                                                max={9}
                                            >
                                                {" "}
                                                <MenuBookIcon />{" "}
                                            </GlobalTealBadge>
                                        )}
                                        {index === 1 && (
                                            <GlobalTealBadge
                                                badgeContent={
                                                    ordered_items.filter(
                                                        (item) =>
                                                            item.billed_out ===
                                                            true
                                                    ).length
                                                }
                                                max={9}
                                            >
                                                {" "}
                                                <PaymentIcon />{" "}
                                            </GlobalTealBadge>
                                        )}
                                        {index === 2 && <ArchiveIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={closeItemText}
                                        primary={item.title}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding sx={listItemContainer}>
                        <Tooltip title={`Items`} placement="right-start">
                            <ListItemButton
                                onClick={handleClick}
                                sx={listItemButtonContainer}
                            >
                                <ListItemIcon
                                    sx={[centerMenuIcons, changeIconsColor]}
                                >
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText
                                    sx={closeItemText}
                                    primary="Items"
                                />
                                <Box sx={accordionExpand}>
                                    {openAccordion ? (
                                        <ExpandLess sx={closeItemText} />
                                    ) : (
                                        <ExpandMore sx={closeItemText} />
                                    )}
                                </Box>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    {accordionList.map((item, index) => (
                        <Collapse
                            in={openAccordion}
                            timeout="auto"
                            unmountOnExit
                        >
                            <ListItem
                                disablePadding
                                sx={listItemContainer}
                                key={item.title}
                                component={Link}
                                to={item.path}
                                button
                                selected={item.path === path}
                            >
                                <List component="div" disablePadding>
                                    <Tooltip
                                        title={item.title}
                                        placement="right-start"
                                    >
                                        <ListItemButton
                                            sx={accordionItemButtonContainer}
                                        >
                                            <ListItemIcon sx={changeIconsColor}>
                                                {index === 0 && (
                                                    <InsertDriveFileIcon />
                                                )}
                                                {index === 1 && (
                                                    <CategoryIcon />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.title}
                                            />
                                        </ListItemButton>
                                    </Tooltip>
                                </List>
                            </ListItem>
                        </Collapse>
                    ))}
                    {menuList2.map((item, index) => (
                        <ListItem
                            disablePadding
                            sx={listItemContainer}
                            key={item.title}
                            component={Link}
                            to={item.path}
                            button
                            selected={item.path === path}
                        >
                            <Tooltip title={item.title} placement="right-start">
                                <ListItemButton sx={listItemButtonContainer}>
                                    <ListItemIcon
                                        sx={[centerMenuIcons, changeIconsColor]}
                                    >
                                        {index === 1 && <QrCodeIcon />}
                                        {index === 0 && <TableChartIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={closeItemText}
                                        primary={item.title}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {menulist3.map((item, index) => (
                        <ListItem
                            disablePadding
                            sx={listItemContainer}
                            key={item.title}
                            component={Link}
                            to={item.path}
                            button
                            selected={item.path === path}
                        >
                            <Tooltip title={item.title} placement="right-start">
                                <ListItemButton sx={listItemButtonContainer}>
                                    <ListItemIcon
                                        sx={[centerMenuIcons, changeIconsColor]}
                                    >
                                        {index === 0 && <LogoutIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={closeItemText}
                                        primary={item.title}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={mainComponentContainer}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Navbar;
