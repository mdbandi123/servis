import React, {useEffect} from 'react';
import RouteMenu from './RouteMenu';
import { useLocation } from 'react-router-dom';
import useStore from './store/store';
import socketIOClient from "socket.io-client";

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { setOrderId, setTableNumber, setMenuItems, setCategoryItems, setOrderedItems } = useStore();

  useEffect(() => {
    document.title = 'Menu';
    setOrderId(queryParams.get('order_id') || localStorage.getItem("order_id"));
  }, []);

  useEffect(() => {
    const order_id = queryParams.get('order_id') || localStorage.getItem('order_id');

    fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${order_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrderId(order_id);
          localStorage.setItem("order_id", order_id);
          setTableNumber(data.session.table_number);
        }
      }
    ).catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);
    // Send the order_id to the server
    socket.emit("sendOrderId", queryParams.get('order_id') || localStorage.getItem("order_id"));

    //listen for real-time updates from the server menu
    socket.on("menu-update", (data) => {
        setMenuItems(data.items);
        console.log("menu update: ", data.items);
    });

    // Listen for real-time updates from the server
    socket.on(`${queryParams.get('order_id') || localStorage.getItem("order_id")}-orders-update`, (data) => {
      setOrderedItems(data.items);
      console.log("orders update: ", data.items);
    });


    // listen for real-time updates from the server categories
    socket.on("categories-update", (data) => {
        console.log("categories update: ", data.items);
        setCategoryItems(data.items);
    });

    // Cleanup the effect
    return () => {
        socket.disconnect();
    };
  }, []);

  return (
    <div>
      <RouteMenu />
    </div>
  );
}

export default App;
