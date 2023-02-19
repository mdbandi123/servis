import React, { useState } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Slide, Stack, Card, CardActionArea, Paper, IconButton } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, Avatar, ListItemAvatar } from '@mui/material/';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { purple, blue, grey, red, green, yellow, orange } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import GlobalBlackBody1 from '../typographies/bodies/BlackBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalBlackHeader6 from '../typographies/headers/BlackHeader6';
import GlobalBlackBody2 from '../typographies/bodies/BlackBody2';
import GlobalGreyBody2 from '../typographies/bodies/GreyBody2';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const userOrders = [
    { orderId: '1', foodItemName: 'Pork Tonkatsu', foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=` },
    { orderId: '2', foodItemName: 'Fried Chicken', foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=` },
    { orderId: '3', foodItemName: 'Mango Pudding', foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=`, },
    { orderId: '4', foodItemName: 'Pork Tonkatsu', foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=`, },
    { orderId: '5', foodItemName: 'Pork Tonkatsu', foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=`, }
];

const userOrderStatus = {
    pending: {
        name: 'Pending',
        items: userOrders,
        theme: red[500]
    },
    preparing: {
        name: 'Preparing',
        items: [],
        theme: orange[500]
    },
    served: {
        name: 'Served',
        items: [],
        theme: green[500]
    },
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function ViewOrderModal(props) {
    const [openViewOrderModal, setOpenViewOrderModal] = React.useState(false);

    const [columns, setColumns] = useState(userOrderStatus);

    const viewOrderHandler = () => {
        setOpenViewOrderModal(true);
    };

    const cancelViewModalHandler = () => {
        setOpenViewOrderModal(false);
    };

    const closeIconButton = {
        position: 'absolute',
        top: 0,
        right: 0
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    const dateAndTimeIcon = {
        color: purple[900],
    };

    const userOrderStatusContainer = {
        display: 'flex',
        flexDirection: 'column', 
        height: '100%',
        marginLeft: 3,
        marginRight: 1,
        paddingTop: 1,
        backgroundColor: grey[200]
    };

    const orderStatusName = {
        pt: 2,
        pb: 1,
        fontSize: '1.3em'
    };

    const orderStatusContent = {
        margin: 1,
        padding: 0,
        width: 330,
        maxHeight: 350, 
        overflow: 'auto'
    };

    const orderListCard = {
        boxShadow: 2,
        userSelect: 'none',
        padding: 2,
        marginBottom: 0.5,
        minHeight: '50px',
        color: grey[900],
        borderLeft: `3px solid ` + blue[900],
        '&:hover': {
            backgroundColor: grey[100],
            Transition: '0.5s'
        }
    };

    const foodImageAvatar = {
        width: 50,
        height: 50
    };

    const foodItemName = {
        fontWeight: 'bold'
    };

    const orderListDate = {
        fontSize: '0.7em'
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        p: 2
    };
    
    const noDataIcon = {
        fontSize: '3em'
    };

    const orderStatusSection = {
        marginLeft: 2
    }

    if (userOrders.length === 0) {
        return(
            <React.Fragment>
                <CardActionArea onClick={viewOrderHandler}>{props.children}</CardActionArea>
                <Dialog keepMounted fullWidth maxWidth='xl' open={openViewOrderModal} TransitionComponent={Transition} onClose={cancelViewModalHandler} aria-describedby='alert-dialog-slide-description'>
                    <DialogTitle sx={dialogAlignment}>
                        <AccountCircleIcon sx={props.sx} />
                        <GlobalBlackHeader5 text={props.title + ' (' + props.userId + ')'} />
                    </DialogTitle>
                    <Box sx={closeIconButton}>
                        <IconButton >
                            <CloseIcon onClick={cancelViewModalHandler} />
                        </IconButton>
                    </Box>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                            <Grid2 container justifyContent='center' >
                                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
                                    {Object.entries(columns).map(([columnId, column], index) => {
                                        return (
                                            <Card sx={[userOrderStatusContainer, { backgroundColor: column.theme }]} key={columnId} >
                                                <Grid2 container sx={orderStatusSection}>
                                                    <Grid2 item container>
                                                        <Grid2 item container direction='column'>
                                                            <Grid2 item>
                                                                <Stack direction='row' alignItems='center' spacing={2}>
                                                                    <GlobalBlackHeader6 sx={[orderStatusName]} text={column.name} />
                                                                    <GlobalBlackHeader6 sx={[orderStatusName, { color: column.theme }]} text='5' />
                                                                </Stack>
                                                            </Grid2>
                                                        </Grid2>
                                                    </Grid2>
                                                </Grid2>
                                                <Droppable droppableId={columnId} key={columnId}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <Box {...provided.droppableProps} ref={provided.innerRef} sx={orderStatusContent} >
                                                                {column.items.map((item, index) => {
                                                                    return (
                                                                        <Draggable key={item.orderId} draggableId={item.orderId} index={index} >
                                                                            {(provided, snapshot) => {
                                                                                return (
                                                                                    <Paper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                                        sx={[orderListCard, { backgroundColor: snapshot.isDragging ? grey[100] : grey[50], ...provided.draggableProps.style }]}>
                                                                                        <ListItem>
                                                                                            <Grid2 container alignContent='center' alignItems='center' >
                                                                                                <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4} alignContent='center'>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar src={item.foodItemImage} sx={foodImageAvatar} />
                                                                                                    </ListItemAvatar>
                                                                                                </Grid2>
                                                                                                <Grid2 item xs={8} sm={8} md={8} lg={8} lx={8}>
                                                                                                    <Grid2 container spacing={2}>
                                                                                                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                                                                            <GlobalBlackBody1 text={item.foodItemName} sx={foodItemName} />
                                                                                                            <GlobalBlackBody2 text='#123123' />
                                                                                                        </Grid2>
                                                                                                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                                                                            <GlobalGreyBody2 text='06/25/2022 | 03:12:21' sx={orderListDate} />
                                                                                                        </Grid2>
                                                                                                    </Grid2>
                                                                                                </Grid2>
                                                                                            </Grid2>
                                                                                        </ListItem>
                                                                                    </Paper>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    );
                                                                })}
                                                                {provided.placeholder}
                                                            </Box>
                                                        );
                                                    }}
                                                </Droppable>   
                                            </Card>
                                        );
                                    })}
                                    <Stack direction='row' sx={centerAlignment} spacing={1}>
                                        <Grid2 container>
                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                <FindInPageTwoToneIcon sx={noDataIcon} />
                                                <GlobalBlackHeader5 text='No Order List Found' />
                                            </Grid2>
                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                <GlobalGreyBody2 text={`We couldn't find any order. Please wait for the customers' order`} />
                                            </Grid2>
                                        </Grid2>
                                    </Stack>
                                </DragDropContext>
                            </Grid2>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <GlobalBlueTextButton text='Close' onClick={cancelViewModalHandler} />
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    };
    return (
        <React.Fragment>
            <CardActionArea onClick={ viewOrderHandler }>{props.children}</CardActionArea>
            <Dialog keepMounted fullWidth maxWidth='xl' open={ openViewOrderModal } TransitionComponent={ Transition } onClose={ cancelViewModalHandler } aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={ dialogAlignment }>
                    <AccountCircleIcon sx={ props.sx } />
                    <GlobalBlackHeader5 text={ props.title + ' (' + props.userId + ')' } />
                </DialogTitle>
                <Box sx={ closeIconButton }>
                    <IconButton >
                        <CloseIcon onClick={ cancelViewModalHandler } />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Grid2 container justifyContent='center' >
                            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
                                {Object.entries(columns).map(([columnId, column], index) => {
                                    return (
                                        <Card sx={[userOrderStatusContainer, {borderTop: '5px solid ' + column.theme }]} key={columnId} >
                                            <Grid2 container sx={orderStatusSection}>
                                                <Grid2 item container>
                                                    <Grid2 item container direction='column'>
                                                        <Grid2 item>
                                                            <Stack direction='row' alignItems='center' spacing={2}>
                                                                <GlobalBlackHeader6 sx={[orderStatusName]} text={column.name} />
                                                                <GlobalBlackHeader6 sx={[orderStatusName, {color: column.theme}]} text='5' />
                                                            </Stack>
                                                        </Grid2>
                                                    </Grid2>
                                                </Grid2>
                                            </Grid2>
                                            <Droppable droppableId={columnId} key={columnId}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <Box {...provided.droppableProps} ref={provided.innerRef} sx={orderStatusContent} >
                                                            {column.items.map((item, index) => {
                                                                return (
                                                                    <Draggable key={item.orderId} draggableId={item.orderId} index={index} >
                                                                        {(provided, snapshot) => { 
                                                                            return (
                                                                                <Paper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                                    sx={[ orderListCard, { backgroundColor: snapshot.isDragging ? grey[200] : grey[50], ...provided.draggableProps.style }]}>
                                                                                    <ListItem>
                                                                                        <Grid2 container alignContent='center' alignItems='center' >
                                                                                            <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4} alignContent='center'>
                                                                                                <ListItemAvatar>
                                                                                                    <Avatar src={item.foodItemImage} sx={foodImageAvatar} />
                                                                                                </ListItemAvatar>
                                                                                            </Grid2>
                                                                                            <Grid2 item xs={8} sm={8} md={8} lg={8} lx={8}>
                                                                                                <Grid2 container spacing={2}>
                                                                                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                                                                        <GlobalBlackBody1 text={item.foodItemName} sx={foodItemName} />
                                                                                                        <GlobalBlackBody2 text='#123123' />
                                                                                                    </Grid2>
                                                                                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                                                                        <GlobalGreyBody2 text='06/25/2022 | 03:12:21' sx={orderListDate} />
                                                                                                    </Grid2>
                                                                                                </Grid2>
                                                                                            </Grid2>
                                                                                        </Grid2>
                                                                                    </ListItem>
                                                                                </Paper>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            })}
                                                            {provided.placeholder}
                                                        </Box>
                                                    );
                                                }}
                                            </Droppable>
                                        </Card>
                                    );
                                })}
                            </DragDropContext>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalBlueTextButton text='Close' onClick={ cancelViewModalHandler } />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ViewOrderModal;