import React from "react";
import "./App.css";
import RouteMenu from "./RouteMenu";
import { useStore } from "./store/store";
import socketIOClient from "socket.io-client";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

firebase.initializeApp(firebaseConfig);

function App() {
    const {
        setMenuItems,
        setCategoryItems,
        setOrderedItems,
        setUser,
        setTableData,
    } = useStore();


    React.useEffect(() => {
         firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          }
        });
      }, []);
    

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

        //listen for real-time updates from table menu
        socket.on("tables-update", (data) => {
            console.log("table update: ", data.tables);
            setTableData(data.tables);
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
        <>
            <RouteMenu />
        </>
    );
}

export default App;
