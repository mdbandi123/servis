import React, {useEffect} from 'react';
import RouteMenu from './RouteMenu';
import { useLocation } from 'react-router-dom';
import useStore from './store/store';
import socketIOClient from "socket.io-client";
import Fallback from './pages/fallback/Fallback.js';

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { setOrderId, setTableNumber, setMenuItems, setCategoryItems, setOrderedItems, setCartItems } = useStore();
  const [orderIdValid, setOrderIdValid] = React.useState(true);

  useEffect(() => {
    document.title = 'Menu';
    setOrderId(queryParams.get('order_id') || localStorage.getItem("order_id"));
  }, []);

  useEffect(() => {
    const order_id = queryParams.get('order_id') || localStorage.getItem('order_id');

    fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${order_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setOrderId(order_id);
          localStorage.setItem("order_id", order_id);
          setTableNumber(data.session.table_number);
        } else {
          setOrderIdValid(false)
        }
      }
    ).catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

    const order_id = queryParams.get('order_id') || localStorage.getItem('order_id');
    // Send the order_id to the server
    socket.emit("sendOrderId", order_id);

    //listen for real-time updates from the server menu
    socket.on("menu-update", (data) => {
        setMenuItems(data.items);
        console.log("menu update: ", data.items);
    });

    // Listen for real-time order updates from the server
    socket.on(`${order_id}-orders-update`, (data) => {
      setOrderedItems(data.ordered_items);
      setCartItems(data.cart_items)
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
      {orderIdValid ? < RouteMenu /> : <Fallback />}
    </div>
  );
}

export default App;
