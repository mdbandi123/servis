import React from 'react';
import './App.css';
import RouteMenu from './RouteMenu';
import { useStore } from "./store/store";
import socketIOClient from "socket.io-client";

function App() {
  const {
    setMenuItems,
    setCategoryItems,
  } = useStore();

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
      <RouteMenu />
    </div>
  );
}

export default App;
