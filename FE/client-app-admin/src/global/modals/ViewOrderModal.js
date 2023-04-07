import React, { useState } from "react";
import { useStore } from "../../store/store";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
    Box,
    Slide,
    Stack,
    Card,
    CardActionArea,
    Paper,
    IconButton,
    Tooltip,
    Chip
} from "@mui/material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItem,
    Avatar,
    ListItemAvatar,
} from "@mui/material/";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { grey, red, green, orange, teal } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";

import GlobalBlackBody1 from "../typographies/bodies/BlackBody1";
import GlobalBlackHeader5 from "../typographies/headers/BlackHeader5";
import GlobalOrangeTextButton from "../buttons/text/OrangeTextButton";
import GlobalBlackHeader6 from "../typographies/headers/BlackHeader6";
import GlobalBlackBody2 from "../typographies/bodies/BlackBody2";
import GlobalGreyBody2 from "../typographies/bodies/GreyBody2";
import GlobalTealContainedButton from "../buttons/contains/TealContainedButton";
import GlobalTealBadge from "../badges/TealBadge";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteOrderModal from "./DeleteOrderModal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const onDragEnd = (result, columns, setColumns, user) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        // Make a request to update the status of the item in the order
        const item = removed;
        console.log("item", item);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.Aa,
            },
            body: JSON.stringify({
                order_id: item.order_id,
                item_id: item._id,
                status: destColumn.name.toLowerCase(),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update item status");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error updating item status:", error);
                // Put the item back to its original column
                sourceItems.splice(source.index, 0, removed);
                setColumns({
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        items: sourceItems,
                    },
                });
            });

        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
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
                items: copiedItems,
            },
        });
    }
};

function ViewOrderModal(props) {
    const { user } = useStore();

    const [checkedItems, setCheckedItems] = useState({});
    console.log(checkedItems);

    const checkboxHandler = (event, item) => {
        setCheckedItems({
        ...checkedItems,
        [event.target.name]: {
            checked: event.target.checked,
            status: item.status
        }
        });
    };

    const [checkedColumns, setCheckedColumns] = useState({});

    const columnCheckboxHandler = (columnIndex, event, column) => {
        const isChecked = event.target.checked;
        setCheckedColumns({
            ...checkedColumns,
            [columnIndex]: isChecked
        });
    
        const updatedCheckedItems = { ...checkedItems };
        column.items.forEach((item) => {
            updatedCheckedItems[item._id] = {
                checked: isChecked,
                status: item.status
            };
        });
        setCheckedItems(updatedCheckedItems);
    };

    const hasCheckedItemsWithStatus = (status) => {
        for (const key in checkedItems) {
          if (checkedItems[key].checked && props.orders.ordered_items.find((item) => item._id === key && item.status === status)) {
            return true;
          }
        }
        return false;
      };

      console.log(props);
      
    const changeOrderStatusHandler = (oldStatus,newStatus) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/status_bulk`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.Aa,
            },
            body: JSON.stringify({
                order_id: props.orders.order_id,
                items: Object.keys(checkedItems).filter((key) => checkedItems[key].checked && checkedItems[key].status === oldStatus),
                status: newStatus,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update item status");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCheckedItems({})
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteItemFromOrder = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/items`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.Aa,
            },
            body: JSON.stringify({
                order_id: props.orders.order_id,
                items: Object.keys(checkedItems).filter((key) => checkedItems[key].checked && checkedItems[key].status === "pending"),
            }),
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error("Failed to delete items");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCheckedItems({})
            })
            .catch((error) => {
                console.error(error);
            });
    };
      
    const initialUserOrderStatus = {
        pending: {
            name: "Pending",
            items: [],
            theme: red[500],
        },
        preparing: {
            name: "Preparing",
            items: [],
            theme: orange[500],
        },
        served: {
            name: "Served",
            items: [],
            theme: green[500],
        },
    };

    const [openViewOrderModal, setOpenViewOrderModal] = React.useState(false);
    const [columns, setColumns] = useState(initialUserOrderStatus);

    React.useEffect(() => {
        
        const userOrderStatus = {
            pending: {
                name: "Pending",
                items: props.orders.ordered_items.filter(
                    (order) => order.status === "pending"
                ),
                theme: red[500],
            },
            preparing: {
                name: "Preparing",
                items: props.orders.ordered_items.filter(
                    (order) => order.status === "preparing"
                ),
                theme: orange[500],
            },
            served: {
                name: "Served",
                items: props.orders.ordered_items.filter(
                    (order) => order.status === "served"
                ),
                theme: green[500],
            },
        };

        setColumns(userOrderStatus);
    }, [props.orders]);

    const viewOrderHandler = () => {
        setOpenViewOrderModal(true);
    };

    const cancelViewModalHandler = () => {
        setOpenViewOrderModal(false);
    };

    const dialogAlignment = {
        alignItems: "center",
        display: "flex",
    };

    const userOrderStatusContainer = {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginLeft: 3,
        marginRight: 1,
        paddingTop: 1,
        backgroundColor: grey[300],
    };

    const orderStatusName = {
        fontSize: "1.3em",
    };

    const orderStatusContent = {
        margin: 1,
        padding: 0,
        width: 330,
        height: 350,
        overflow: "auto",
    };

    const orderListCard = {
        boxShadow: 2,
        userSelect: "none",
        padding: 2,
        marginBottom: 0.5,
        minHeight: "50px",
        color: grey[900],
        
        "&:hover": {
            backgroundColor: grey[100],
            Transition: "0.5s",
        },
    };

    const item_name = {
        fontSize: '1.1em'
    };

    const orderListDate = {
        fontSize: "0.7em",
        ml: 4
    };

    const orderStatusSection = {
        marginLeft: 2,
    };

    const selectCheckbox = {
        '&.Mui-checked': {
            color: teal[500]
        },
        '&.MuiCheckbox-indeterminate': {
            color: teal[500]
        }
    };

    const servedStatusName = {
        mt: 0.5,
        mb: 0.5
    };

    const pendingDeleteBtn = {
        color: red[500], 
        backgroundColor: grey[50], 
        border: '1px solid ' + red[500], 
        '&:hover': { 
            color: red[600], 
            backgroundColor: grey[100], 
            transition: '0.5s'
        }
    };

    const pendingChangeBtn = {
        color: grey[50],
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[600],
            transition: '0.5s'
        }
    };

    const preparingChangeBtn = {
        color: grey[50], 
        backgroundColor: orange[500], 
        '&:hover': { 
            backgroundColor: orange[600], 
            transition: '0.5s' 
        }
    };

    const itemId = {
        ml: 4
    };

    return (
        <React.Fragment>
            <CardActionArea onClick={viewOrderHandler}>
                {props.children}
            </CardActionArea>
            <Dialog
                keepMounted
                fullWidth
                maxWidth="xl"
                open={openViewOrderModal}
                TransitionComponent={Transition}
                onClose={cancelViewModalHandler}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={dialogAlignment}>
                    {/* <AccountCircleIcon sx={props.sx} /> */}
                    <GlobalBlackHeader5 text={props.title} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid2 container justifyContent="center">
                            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns, user) } >
                                {Object.entries(columns).map( ([columnId, column], index) => {
                                      
                                        return (
                                            <Card sx={[ userOrderStatusContainer, { borderTop: "5px solid " + column.theme, }, ]} key={columnId} >
                                                <Grid2 container sx={orderStatusSection} >
                                                    <Grid2 item container direction="row" >
                                                        <Grid2 item container direction="row" alignItems='center'>
                                                            <Grid2 item>
                                                                {index === 0 && (
                                                                    <FormControlLabel
                                                                    label={
                                                                      <>
                                                                        <Grid2 item container direction="row" spacing={1}>
                                                                          <Grid2 item>
                                                                            <GlobalBlackHeader5 sx={[orderStatusName]} text={column.name} />
                                                                          </Grid2>
                                                                          <Grid2 item>
                                                                            <GlobalBlackHeader5 sx={[orderStatusName, { color: column.theme }]} text={column.items.length} />
                                                                          </Grid2>
                                                                        </Grid2>
                                                                      </>
                                                                    }
                                                                    control={
                                                                      <Checkbox
                                                                        sx={selectCheckbox}
                                                                        checked={checkedColumns[index] || false}
                                                                        onChange={(event) => columnCheckboxHandler(index, event, column)}
                                                                        // indeterminate={
                                                                        //   checkedColumns[index] === undefined &&
                                                                        //   column.items.some((item) => checkedItems[item._id])
                                                                        // }
                                                                      />
                                                                    }
                                                                  />
                                                                )}
                                                                {index === 1 && (
                                                                    <FormControlLabel
                                                                    label={
                                                                      <>
                                                                        <Grid2 item container direction="row" spacing={1}>
                                                                          <Grid2 item>
                                                                            <GlobalBlackHeader5 sx={[orderStatusName]} text={column.name} />
                                                                          </Grid2>
                                                                          <Grid2 item>
                                                                            <GlobalBlackHeader5 sx={[orderStatusName, { color: column.theme }]} text={column.items.length} />
                                                                          </Grid2>
                                                                        </Grid2>
                                                                      </>
                                                                    }
                                                                    control={
                                                                      <Checkbox
                                                                        sx={selectCheckbox}
                                                                        checked={checkedColumns[index] || false}
                                                                        onChange={(event) => columnCheckboxHandler(index, event, column)}
                                                                        // indeterminate={
                                                                        //   checkedColumns[index] === undefined &&
                                                                        //   column.items.some((item) => checkedItems[item._id])
                                                                        // }
                                                                      />
                                                                    }
                                                                  />
                                                                )}
                                                                {index === 2 && (
                                                                    <>
                                                                        <Grid2 sx={servedStatusName} item container direction="row" spacing={1}>
                                                                            <Grid2 item>
                                                                                <GlobalBlackHeader5 sx={[orderStatusName]} text={column.name} />
                                                                            </Grid2>
                                                                            <Grid2 item>
                                                                                <GlobalBlackHeader5 sx={[orderStatusName, { color: column.theme }]} text={column.items.length} />
                                                                            </Grid2>
                                                                        </Grid2>
                                                                    </>
                                                                )}
                                                            </Grid2>
                                                            <Grid2 item>
                                                                {index === 0 && (
                                                                    <>
                                                                        <Stack direction='row' spacing={1}>
                                                                            <Box>
                                                                                <DeleteOrderModal 
                                                                                    sx={ pendingDeleteBtn } variant="outlined" label="Delete" disabled={!hasCheckedItemsWithStatus("pending")}
                                                                                    header={`Delete Orders in ${column.name} Status`}
                                                                                    context='Are you sure you want to Delete?'
                                                                                    deleteHandler={deleteItemFromOrder}
                                                                                />
                                                                            </Box>
                                                                            <Box>
                                                                            <Chip
                                                                                sx={pendingChangeBtn}
                                                                                label="Prepare"
                                                                                onClick={() => changeOrderStatusHandler("pending","preparing")}
                                                                                disabled={!hasCheckedItemsWithStatus("pending")}
                                                                            />
                                                                            </Box>
                                                                        </Stack>
                                                                    </>
                                                                )}
                                                                {index === 1 && (
                                                                    <>
                                                                        <Stack direction='row' spacing={1}>
                                                                            <Box>
                                                                                <Chip 
                                                                                sx={ preparingChangeBtn } 
                                                                                label="Serve"
                                                                                onClick={() => changeOrderStatusHandler("preparing","served")}
                                                                                disabled={!hasCheckedItemsWithStatus("preparing")}
                                                                                />
                                                                            </Box>
                                                                        </Stack>
                                                                    </>
                                                                )}
                                                                
                                                            </Grid2>
                                                        </Grid2>
                                                    </Grid2>
                                                </Grid2>
                                                <Droppable droppableId={columnId} key={columnId} >
                                                    {(provided, snapshot) => {
                                                       
                                                        return (
                                                            <Box {...provided.droppableProps} ref={ provided.innerRef } sx={ orderStatusContent } >
                                                                {column.items.map(
                                                                    ( item, index ) => {
                                                                        return (
                                                                            <Draggable key={ item._id } draggableId={ item._id }  index={ index } >
                                                                                {( provided, snapshot ) => {
                                                                                    return (
                                                                                        <Paper ref={ provided.innerRef } {...provided.draggableProps} {...provided.dragHandleProps}
                                                                                            sx={[orderListCard, { borderLeft: `3px solid ` + column.theme, backgroundColor: snapshot.isDragging ? grey[200] : grey[50], ...provided .draggableProps .style,}, ]} >
                                                                                            
                                                                                            <ListItem>
                                                                                                <Grid2 container alignContent="center" alignItems="center" >
                                                                                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                                                                                        <Grid2 container spacing={2} >
                                                                                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12} >
                                                                                                                <Stack direction='row' alignItems='center' spacing={2}>
                                                                                                                    {
                                                                                                                        column.name == "Served" ? (
                                                                                                                            <FormControlLabel
                                                                                                                                label={<>
                                                                                                                                    <Grid2 item container direction="row" spacing={2}>
                                                                                                                                        <Grid2 item>
                                                                                                                                            <GlobalBlackBody1 text={`${item.item_name}`} sx={item_name} />
                                                                                                                                        </Grid2>
                                                                                                                                        <Grid2 item>
                                                                                                                                            <GlobalTealBadge badgeContent={item.quantity} />
                                                                                                                                        </Grid2>
                                                                                                                                    </Grid2>
                                                                                                                                </>}
                                                                                                                                control={<Checkbox sx={selectCheckbox} checked={false} disabled={true} />}
                                                                                                                            />
                                                                                                                        ) : (
                                                                                                                            <FormControlLabel
                                                                                                                                label={
                                                                                                                                    <>
                                                                                                                                    <Grid2 item container direction="row" spacing={2}>
                                                                                                                                        <Grid2 item>
                                                                                                                                        <GlobalBlackBody1 text={`${item.item_name}`} sx={item_name} />
                                                                                                                                        </Grid2>
                                                                                                                                        <Grid2 item>
                                                                                                                                        <GlobalTealBadge badgeContent={item.quantity} />
                                                                                                                                        </Grid2>
                                                                                                                                    </Grid2>
                                                                                                                                    </>
                                                                                                                                }
                                                                                                                                control={
                                                                                                                                    <Checkbox
                                                                                                                                    sx={selectCheckbox}
                                                                                                                                    checked={checkedItems[item._id]?.checked || false}
                                                                                                                                    onChange={(event) => checkboxHandler(event, item)}
                                                                                                                                    name={item._id}
                                                                                                                                    />
                                                                                                                                }
                                                                                                                                />
                                                                                                                        )
                                                                                                                    }
                                                                                                                </Stack> 
                                                                                                                <GlobalGreyBody2 sx={ itemId } text={`#${item._id.substr( 0, 9 )}`} />
                                                                                                            </Grid2>
                                                                                                            <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12} >
                                                                                                                <GlobalGreyBody2 text={[
                                                                                                                        new Date(new Date(item.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getMonth() + 1 + '-' +
                                                                                                                        new Date(new Date(item.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getDate() + '-' +
                                                                                                                        new Date(new Date(item.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getFullYear() + ' | ' +
                                                                                                                        new Date(new Date(item.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getHours() + ':' +
                                                                                                                        new Date(new Date(item.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getMinutes() + ':' +
                                                                                                                        new Date(new Date(item.time_ordered).getTime() - (8 * 60 * 60 * 1000)).getSeconds()
                                                                                                                    ]} 
                                                                                                                    sx={ orderListDate }
                                                                                                                />
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
                                                                    }
                                                                )}
                                                                {
                                                                    provided.placeholder
                                                                }
                                                            </Box>
                                                        );
                                                    }}
                                                </Droppable>
                                            </Card>
                                        );
                                    }
                                )}
                            </DragDropContext>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealContainedButton
                        text="Close"
                        onClick={cancelViewModalHandler}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ViewOrderModal;
