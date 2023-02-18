import React, { useState } from "react";

import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import { Avatar, Container, ListItem, ListItemAvatar, ListItemText, Paper, Box } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { grey } from "@mui/material/colors";

const userOrders = [
  { orderId: "1", foodItemName: "Pork Tonkatsu", foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=` },
  { orderId: "2", foodItemName: "Fried Chicken", foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=` },
  { orderId: "3", foodItemName: "Mango Pudding", foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=`, },
  { orderId: "4", foodItemName: "Pork Tonkatsu", foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=`, },
  { orderId: "5", foodItemName: "Pork Tonkatsu", foodItemImage: `https://media.istockphoto.com/id/1364936307/photo/pork-tonkatsu.jpg?s=1024x1024&w=is&k=20&c=SSTaoCgZKHms3gm17F0NS9M0w_r9AQaKLKu_kEwzLtA=`, }
];

const userOrderStatus = {
  pending: {
    name: "Pending",
    items: userOrders
  },
  preparing: {
    name: "Preparing",
    items: []
  },
  served: {
    name: "Served",
    items: []
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

function Settings() {
  const [columns, setColumns] = useState(userOrderStatus);

  return (
    <React.Fragment>
      <Box>
        <GlobalPurpleHeader4 text='Settings' />
      </Box>
      <Container style={{ display: "flex", justifyContent: "center", height: "100%" }} >
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Paper style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={columnId} >
                <h2 >{column.name}</h2>
                <Box style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <Paper {...provided.droppableProps} ref={provided.innerRef} style={{ boxShadow: 2, background: snapshot.isDraggingOver ? grey[400] : grey[300], padding: 4, width: 250, minHeight: 500 }} >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.orderId} draggableId={item.orderId} index={index} >
                                {(provided, snapshot) => {
                                  return (
                                    <Paper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                      style={{ boxShadow: 2, userSelect: "none", padding: 16, margin: "0 0 8px 0", minHeight: "50px", backgroundColor: snapshot.isDragging ? grey[200] : grey[50], color: grey[900], ...provided.draggableProps.style }}>
                                      <ListItem>
                                        <ListItemAvatar>
                                          <Avatar src={item.foodItemImage} />
                                        </ListItemAvatar>
                                        <ListItemText primary={item.foodItemName} />
                                      </ListItem>
                                    </Paper>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Paper>
                      );
                    }}
                  </Droppable>
                </Box>
              </Paper>
            );
          })}
        </DragDropContext>
      </Container>
    </React.Fragment>
  );
}

export default Settings;