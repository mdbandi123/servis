import React from 'react';
import './App.css';
import RouteMenu from './RouteMenu';
import { useStore } from "./store/store";
import socketIOClient from "socket.io-client";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtLIYGQwaTYpH3VWDLqcy3yxv1pwxMmhA",
  authDomain: "servis-1603b.firebaseapp.com",
  projectId: "servis-1603b",
  storageBucket: "servis-1603b.appspot.com",
  messagingSenderId: "552335220448",
  appId: "1:552335220448:web:2a18bc3ec31cdfea623a85"
};

firebase.initializeApp(firebaseConfig);

function App() {

  const {
    setMenuItems,
    setCategoryItems,
    setOrderedItems
  } = useStore();

  React.useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

    // listen for real-time updates from the server orders
    socket.on("orders-update", (data) => {
        console.log("orders update: ", data.items);
        // set the order_id in the store
        setOrderedItems(data.items);
    });

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
      <RouteMenu />
    </div>
  );
}

export default App;
