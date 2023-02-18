import * as React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material/';
import { CssBaseline, IconButton } from '@mui/material/';
import { Box, Toolbar, Divider } from '@mui/material/';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaymentIcon from '@mui/icons-material/Payment';
import ArchiveIcon from '@mui/icons-material/Archive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import GlobalWhiteHeader5 from './global/typographies/headers/WhiteHeader5';

const drawerWidth = 220;

const openedMixin = (theme) => ({
    backgroundColor: blue[700],
    color: grey[50],
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme) => ({
    backgroundColor: blue[700],
    color: grey[50],
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    backgroundColor: blue[700],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme)
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme)
        })
    })
);

function Navbar() {
    const theme = useTheme();

    const location = useLocation();
    const path = location.pathname;

    const [openAccordion, setOpenAccordion] = React.useState(false);
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

    const adminAccount = [
        { name: 'Admin User',business: 'Business Name', path: '/settings' }
    ];

    const menuList1 = [
        { title: 'Order List', path: '/' },
        { title: 'Payment', path: '/payment' },
        { title: 'Archive', path: '/archive' }
    ];

    const menuList2 = [
        { title: 'Generate', path: '/generate' },
        { title: 'Settings', path: '/settings' }
    ];

    const menulist3 = [
        { title: 'Signout', path: '/' }
    ];

    const accordionList = [
        { title: 'Food Items', path: '/fooditems' },
        { title: 'Category Items', path: '/categoryitems' }
    ];

    const menuFlexbox = {
        display: 'flex'
    };

    const centerMenuIcons = {
        minWidth: 0,
        mr: open ? 3 : 'auto',
        justifyContent: 'center'
    };

    const changeIconsColor = {
        color: grey[50]
    };

    const menuIcon = {
        marginRight: 5, 
        ...(open && { display: 'none' })
    };

    const drawerCloseIcon = {
        color: grey[50],
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[600],
            transition: '0.5s'
        }
    };

    const listItemContainer = {
        display: 'block',
    };

    const listItemButtonContainer = {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        '&:hover': {
            backgroundColor: blue[800],
            transition: '0.5s',
        }
    };

    const closeItemText = {
        opacity: open ? 1 : 0
    };

    const mainComponentContainer = {
        flexGrow: 1,
        p: 3
    };

    const accordionItemButtonContainer = {
        minHeight: 48, 'initial': 'center', 
        px: 2.5,
        backgroundColor: blue[800],
        '&:hover': {
            backgroundColor: blue[900],
            transition: '0.5s',
        }
    };
    
    const accordionExpand = {
        position: 'absolute',
        right: '2%'
    };

    return (
        <Box sx={ menuFlexbox }>
            <CssBaseline />
            <AppBar position='fixed' open={ open } >
                <Toolbar>
                    <IconButton sx={ menuIcon } color='inherit' aria-label='open drawer' onClick={ handleDrawerOpen } edge='start'>
                        <MenuIcon />
                    </IconButton>
                    <GlobalWhiteHeader5 text='Admin Interface'/>
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={ open }>
                <DrawerHeader>
                    <IconButton onClick={ handleDrawerClose } sx={ drawerCloseIcon } >
                        { theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {adminAccount.map((item, index) => (
                        <ListItem disablePadding sx={ listItemContainer } key={ item.name } component={ Link } to={ item.path } button selected={ item.path === path }>
                            <ListItemButton sx={ listItemButtonContainer } >
                                <ListItemIcon sx={ [centerMenuIcons, changeIconsColor] } >
                                    { index === 0 && <AccountCircleIcon /> }
                                </ListItemIcon>
                                <ListItemText sx={ closeItemText } primary={ item.name } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuList1.map((item, index) => (
                        <ListItem disablePadding sx={ listItemContainer } key={ item.title } component={ Link } to={ item.path } button selected={ item.path === path } >
                            <ListItemButton sx={ listItemButtonContainer } >
                                <ListItemIcon sx={ [centerMenuIcons, changeIconsColor] } >
                                    { index === 0 && <MenuBookIcon /> }
                                    { index === 1 && <PaymentIcon /> }
                                    { index === 2 && <ArchiveIcon /> }
                                </ListItemIcon>
                                <ListItemText sx={ closeItemText } primary={ item.title } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding sx={ listItemContainer }>
                        <ListItemButton onClick={ handleClick } sx={ listItemButtonContainer } >
                            <ListItemIcon sx={ [centerMenuIcons, changeIconsColor] } >
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText sx={ closeItemText } primary='Items'/>
                            <Box sx={ accordionExpand } >
                                { openAccordion ? <ExpandLess sx={closeItemText} /> : <ExpandMore sx={closeItemText}/> }
                            </Box>
                        </ListItemButton>
                    </ListItem>
                    {accordionList.map((item, index) => (
                        <Collapse in={ openAccordion } timeout='auto' unmountOnExit>
                            <ListItem disablePadding sx={ listItemContainer } key={ item.title } component={ Link } to={ item.path } button selected={ item.path === path } >
                                <List component='div' disablePadding>
                                    <ListItemButton sx={ accordionItemButtonContainer } >
                                        <ListItemIcon sx={ changeIconsColor } >
                                            { index === 0 && <InsertDriveFileIcon /> }
                                            { index === 1 && <CategoryIcon /> }
                                        </ListItemIcon>
                                        <ListItemText primary={ item.title } />
                                    </ListItemButton>
                                </List>
                            </ListItem>
                        </Collapse>
                    ))}
                    {menuList2.map((item, index) => (
                        <ListItem disablePadding sx={ listItemContainer } key={ item.title } component={ Link } to={ item.path } button selected={ item.path === path } >
                            <ListItemButton sx={ listItemButtonContainer } >
                                <ListItemIcon sx={ [centerMenuIcons, changeIconsColor] } >
                                    { index === 0 && <QrCodeIcon /> }
                                    { index === 1 && <SettingsIcon /> }
                                </ListItemIcon>
                                <ListItemText sx={ closeItemText } primary={ item.title } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {menulist3.map((item, index) => (
                        <ListItem disablePadding sx={ listItemContainer } key={ item.title } component={ Link } to={ item.path } button selected={ item.path === path } >
                            <ListItemButton sx={ listItemButtonContainer } >
                                <ListItemIcon sx={ [centerMenuIcons, changeIconsColor] } >
                                    { index === 0 && <LogoutIcon /> }
                                </ListItemIcon>
                                <ListItemText sx={ closeItemText } primary={ item.title } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component='main' sx={ mainComponentContainer }>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Navbar;