import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Menu from './pages/menu/Menu';
import Cart from './pages/cart/Cart';
import Pending from './pages/pending/Pending';
import Payment from './pages/payment/Payment';
import Starters from './pages/menu/starters/Starters';

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
            </Routes>
        </React.Fragment>
    )
}

export default RouteMenu;