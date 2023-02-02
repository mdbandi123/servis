import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import OrderList from './pages/orderlist/OrderList';
import Payment from './pages/payment/Payment';
import Archive from './pages/archive/Archive';
import FoodItems from './pages/items/foodItems/FoodItems';
import CategoryItems from './pages/items/categoryItems/CategoryItems';
import Generate from './pages/generate/Generate';
import Settings from './pages/settings/Settings';

const RouteMenu = () => {
    return (
        <Routes>
            <Route exact element={<Navbar />} >
                <Route path='/' exact element={<OrderList />} />
                <Route path='/payment' exact element={<Payment />} />
                <Route path='/archive' exact element={<Archive />} />
                <Route path='/fooditems' exact element={<FoodItems />} />
                <Route path='/categoryitems' exact element={<CategoryItems />} />
                <Route path='/generate' exact element={<Generate />} />
                <Route path='/settings' exact element={<Settings />} />
            </Route>
        </Routes>
    )
}

export default RouteMenu;