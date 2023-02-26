import * as React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material/';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import MuiDrawer from '@mui/material/Drawer';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { AppBar, Divider, Card, CardContent, Typography, CssBaseline } from '@mui/material';
import { purple, blue, grey } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';

import GlobalGreyCaption1 from '../../global/typographies/captions/GreyCaption1';
import GlobalGreyCaption2 from '../../global/typographies/captions/GreyCaption2';
import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import GlobalBlackBody2 from '../../global/typographies/bodies/BlackBody2';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';
import GlobalPinkBadge from '../../global/badges/PinkBadge';
import ViewOrderModal from '../../global/modals/ViewOrderModal';
import GlobalBlackHeader3 from '../../global/typographies/headers/BlackHeader3';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: '25%',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 10px)`
    }
});

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

function OrderList(props) {
    const [orderListNotification, setOrderListNotification] = React.useState([]);

    const [open, setOpen] = React.useState(true);

    const [openNotificationAppBar, setOpenNotificationAppBar] = React.useState(true);

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
                // orderListNotification(data)
            })
            .catch((error) => console.error(error));
    }, []);

    const handleClick = () => {
        setOpenNotificationAppBar(!openNotificationAppBar);
    };

    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    };

    const displayFlexContainer = {
        display: 'flex'
    };

    const notificationAppBar = {
        backgroundColor: grey[50]
    };

    const notificationHeader = {
        mt: 8
    };

    const notificationListItem = {
        display: 'block'
    };

    const notificationItemButton = {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5
    };

    const notificationItemIcon = {
        minWidth: 0,
        mr: open ? 3 : 'auto',
        justifyContent: 'center'
    };

    const notificationOpenHandler = {
        backgroundColor: 'rgba(13, 71, 161, 0.4)',
        fontSize: '2em',
        color: blue[900],
        borderRadius: '50%',
        textAlign: 'center'
    };

    const notificationUserPhoto = {
        fontSize: '1.7em'
    };

    const notificationTitle = {
        textAlign: 'center'
    };

    const notificationTitleText = {
        opacity: open ? 1 : 0,
        color: blue[900],
        fontSize: '1.5em'
    };

    const notificationOrderContent = {
        opacity: open ? 1 : 0
    };

    const notificationUserName = {
        fontSize: '1.1em', 
        fontWeight: 'bold'
    };

    const userTableIcon = {
        fontSize: '3em'
    };

    const orderListCard = {
        p: 0,
        minWidth: 250,
        maxWidth: 250,
        height: 150,
        flexGrow: 1,
        mr: 1
    };

    const orderNumberIcon = {
        color: purple[900]
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    };

    const noItemIcon = {
        fontSize: '8em'
    };

    const orderListUsername = {
        fontWeight: 'bold',
        fontSize: '1.4em'
    };

    if (orderListNotification.length === 0){
        return (
        <React.Fragment>
            <Box sx={ displayFlexContainer }>
                <Box component='main'>
                    <Box sx={ pageTitleContainer }>
                        <GlobalPurpleHeader4 text='Orders List' />
                    </Box>
                        <Grid2 container sx={centerAlignment} spacing={1}>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <PersonOffTwoToneIcon sx={noItemIcon} />
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <GlobalBlackHeader3 text='No Running Orders' />
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <GlobalGreyBody2 text={`We were unable to find any Orders. Please wait for customers' orders.`} />
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                <GlobalBlueContainedButton text='Create' />
                            </Grid2>
                        </Grid2>
                    </Box>
                <CssBaseline />
                <Drawer variant='permanent' open={ openNotificationAppBar } anchor='right' >
                    <AppBar position='sticky' sx={ notificationAppBar }>
                    <List sx={ notificationHeader }>
                        <ListItem disablePadding sx={ notificationListItem } >
                            <ListItemButton onClick={ handleClick } sx={[ notificationItemButton]} >
                                    <ListItemIcon sx={ notificationItemIcon } >
                                        <GlobalPinkBadge badgeContent={11}>
                                            { openNotificationAppBar ? <ChevronRightIcon sx={ notificationOpenHandler } /> : <ChevronLeftIcon sx={ notificationOpenHandler } />}
                                        </GlobalPinkBadge>
                                    </ListItemIcon>
                                <ListItemText sx={ notificationTitle } disableTypography primary={ <Typography sx={ notificationTitleText } variant='body1' >Notification</Typography> } />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </AppBar>
                    <Divider />
                    {orderListNotification.map((notificationItem) => (
                        <ListItem disablePadding sx={ notificationListItem } >
                            <ViewOrderModal title={ notificationItem.userName } userId={ notificationItem.userNameId } sx={{ color: notificationItem.profileTheme, fontSize: '2em' }}>
                            <ListItemButton sx={ notificationItemButton } >
                                <ListItemIcon sx={ notificationItemIcon } >
                                        <AccountCircleIcon sx={ [notificationUserPhoto, { color: notificationItem.profileTheme }] } />
                                </ListItemIcon>
                                <Stack direction='column' justifyContent='flex-start' spacing={-1} >
                                    <Stack direction='row'>
                                        <Box>
                                            <ListItemText sx={ notificationOrderContent } primary={ <GlobalBlackBody1 sx={ notificationUserName } text={ notificationItem.userName } /> } />
                                        </Box>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Box>
                                            <ListItemText sx={ notificationOrderContent } primary={ <GlobalBlackBody2 text={ notificationItem.userOrder } /> } />
                                        </Box>
                                    </Stack>
                                    <Box alignItems='flex-end' >
                                        <ListItemText sx={ notificationOrderContent } primary={ <GlobalGreyCaption2 text={ [notificationItem.dateOrder.getMonth() + '-', notificationItem.dateOrder.getDate() + '-', notificationItem.dateOrder.getFullYear() + ' | ' + notificationItem.dateOrder.getHours() + ':' + notificationItem.dateOrder.getMinutes() + ':' + notificationItem.dateOrder.getSeconds()] } /> } />
                                    </Box>
                                </Stack>
                            </ListItemButton>
                            </ViewOrderModal>
                            <Divider />
                        </ListItem>
                    ))}
                </Drawer>
            </Box>
        </React.Fragment>
    );
    }

    return (
        <React.Fragment>
            <Box sx={ displayFlexContainer }>
                <Box component='main'>
                    <Box sx={ pageTitleContainer }>
                        <GlobalPurpleHeader4 text='Orders List' />
                    </Box>
                    <Grid2 container spacing={1} alignItems='baseline' >
                        {orderListNotification.map((notificationItem) => (
                            <Grid2 sx={ orderListCard } item xs={12} sm={6} md={6} lg={4} lx={4}>
                            <Card sx={[{ borderBottom: `4px solid ` + notificationItem.profileTheme }]} >
                                    <ViewOrderModal title={ notificationItem.userName } userId={ notificationItem.userNameId } sx={{ color: notificationItem.profileTheme, fontSize: '2em' }}>
                                <CardContent>
                                    <Grid2 container spacing={1}>
                                        <Grid2 item> 
                                            <AccountCircleIcon sx={ [ {color: notificationItem.profileTheme}, userTableIcon] } />
                                        </Grid2>
                                        <Grid2 item xs={12} sm container>
                                            <Grid2 item xs container direction='column' spacing={2}>
                                                <Grid2 item xs>
                                                    <Stack direction='row' alignItems='center' spacing={2}>
                                                        <GlobalBlackHeader6 sx={orderListUsername} text={ notificationItem.userName } />
                                                        <GlobalPinkBadge badgeContent={11} max={9}>
                                                            <LocalDiningIcon sx={ orderNumberIcon } />
                                                        </GlobalPinkBadge>
                                                    </Stack>
                                                    <GlobalGreyBody2 text={ notificationItem.userNameId } />
                                                </Grid2>
                                                <Grid2 item>
                                                    <GlobalGreyCaption1 text={ [notificationItem.dateOrder.getMonth() + '-', notificationItem.dateOrder.getDate() + '-', notificationItem.dateOrder.getFullYear() + ' | ' + notificationItem.dateOrder.getHours() + ':' + notificationItem.dateOrder.getMinutes() + ':' + notificationItem.dateOrder.getSeconds()] } />
                                                </Grid2>
                                            </Grid2>
                                            <Grid2 item />
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                                </ViewOrderModal>
                            </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
                <CssBaseline />
                <Drawer variant='permanent' open={ openNotificationAppBar } anchor='right' >
                    <AppBar position='sticky' sx={ notificationAppBar }>
                    <List sx={ notificationHeader }>
                        <ListItem disablePadding sx={ notificationListItem } >
                            <ListItemButton onClick={ handleClick } sx={[ notificationItemButton]} >
                                    <ListItemIcon sx={ notificationItemIcon } >
                                        <GlobalPinkBadge badgeContent={11}>
                                            { openNotificationAppBar ? <ChevronRightIcon sx={ notificationOpenHandler } /> : <ChevronLeftIcon sx={ notificationOpenHandler } />}
                                        </GlobalPinkBadge>
                                    </ListItemIcon>
                                <ListItemText sx={ notificationTitle } disableTypography  primary={ <Typography sx={ notificationTitleText } variant='body1' >Notification</Typography> } />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </AppBar>
                    <Divider />
                    {orderListNotification.map((notificationItem) => (
                        <ListItem disablePadding sx={ notificationListItem } >
                            <ViewOrderModal title={ notificationItem.userName } userId={ notificationItem.userNameId } sx={{ color: notificationItem.profileTheme, fontSize: '2em' }}>
                            <ListItemButton sx={ notificationItemButton } >
                                <ListItemIcon sx={ notificationItemIcon } >
                                        <AccountCircleIcon sx={ [notificationUserPhoto, { color: notificationItem.profileTheme }] } />
                                </ListItemIcon>
                                <Stack direction='column' justifyContent='flex-start' spacing={-1} >
                                    <Stack direction='row'>
                                        <Box>
                                            <ListItemText sx={ notificationOrderContent } primary={ <GlobalBlackBody1 sx={ notificationUserName } text={ notificationItem.userName } /> } />
                                        </Box>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Box>
                                            <ListItemText sx={ notificationOrderContent } primary={ <GlobalBlackBody2 text={ notificationItem.userOrder } /> } />
                                        </Box>
                                    </Stack>
                                    <Box alignItems='flex-end' >
                                        <ListItemText sx={ notificationOrderContent } primary={ <GlobalGreyCaption2 text={ [notificationItem.dateOrder.getMonth() + '-', notificationItem.dateOrder.getDate() + '-', notificationItem.dateOrder.getFullYear() + ' | ' + notificationItem.dateOrder.getHours() + ':' + notificationItem.dateOrder.getMinutes() + ':' + notificationItem.dateOrder.getSeconds()] } /> } />
                                    </Box>
                                </Stack>
                            </ListItemButton>
                            </ViewOrderModal>
                            <Divider />
                        </ListItem>
                    ))}
                </Drawer>
            </Box>
        </React.Fragment>
    );
}

export default OrderList;