import React, {useEffect}from 'react';
import RouteMenu from './RouteMenu';
import { useLocation } from 'react-router-dom';
import store from './store/store';
import socketIOClient from "socket.io-client";

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { setOrderId, setTableNumber, setMenuItems, setCategoryItems } = store.getState();
  const order_id = store((state) => state.order_id);

  useEffect(() => {
    const orderId = queryParams.get('order_id');
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrderId(orderId);
          setTableNumber(data.session.table_number);
        } else {
          console.log(data.error);
        }
      }
    ).catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

    //listen for real-time updates from the server menu
    socket.on("menu-update", (data) => {
        setMenuItems(data.items);
        console.log("menu update: ", data.items);
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
      {order_id && <RouteMenu />}
    </div>
  );
}

export default App;
