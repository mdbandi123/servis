import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import OrderList from './pages/orderlist/OrderList';
import Payment from './pages/payment/Payment';
import Archive from './pages/archive/Archive';
import FoodItems from './pages/items/foodItems/FoodItems';
import CategoryItems from './pages/items/categoryItems/CategoryItems';
import Generate from './pages/generate/Generate';
import Settings from './pages/settings/Settings';
import Login from './pages/signin/SignIn'
import Logout from './SignOut'

import PrivateRoute from "./PrivateRoute";
import firebase from "firebase/app";
import "firebase/auth";

const RouteMenu = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }

    return (
        <Routes>
            <Route element={<PrivateRoute user={user} />}>
                <Route exact element={<Navbar />}>
                    <Route path='/' exact element={<OrderList user={user}/>} />
                    <Route path='/payment' exact element={<Payment />} />
                    <Route path='/archive' exact element={<Archive />} />
                    <Route path='/fooditems' exact element={<FoodItems />} />
                    <Route path='/categoryitems' exact element={<CategoryItems />} />
                    <Route path='/generate' exact element={<Generate />} />
                    <Route path='/settings' exact element={<Settings />} />
                    <Route path='/logout' element={<Logout/>} />
                </Route>
            </Route>
            <Route path='/login' exact element={<Login/>} />
        </Routes>
    )
}

export default RouteMenu;