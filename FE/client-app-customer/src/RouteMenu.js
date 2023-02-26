import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Menu from './pages/menu/Menu';
import Cart from './pages/cart/Cart';
import Pending from './pages/pending/Pending';
import Payment from './pages/payment/Payment';
import Starters from './pages/menu/starters/Starters';
import Meals from './pages/menu/meals/Meals';
import SideDishes from './pages/menu/sidedishes/SideDishes';
import Drinks from './pages/menu/drinks/Drinks';
import Desserts from './pages/menu/desserts/Desserts';

const RouteMenu = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Routes exact element={<Navigation />} >
                <Route path='/' exact element={<Menu />} />
                <Route path='/cart' exact element={<Cart />} />
                <Route path='/pending' exact element={<Pending />} />
                <Route path='/payment' exact element={<Payment />} />
                <Route path='/starters' exact element={<Starters />} />
                <Route path='/meals' exact element={<Meals />} />
                <Route path='/sidedishes' exact element={<SideDishes />} />
                <Route path='/drinks' exact element={<Drinks />} />
                <Route path='/desserts' exact element={<Desserts />} />
            </Routes>
        </React.Fragment>
    )
}

export default RouteMenu;