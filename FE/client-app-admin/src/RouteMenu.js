import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import OrderList from './pages/orderlist/OrderList';
import Payment from './pages/payment/Payment';
import Archive from './pages/archive/Archive';
import FoodItems from './pages/items/foodItems/FoodItems';
import CategoryItems from './pages/items/categoryItems/CategoryItems';
import Generate from './pages/generate/Generate';
import TableManagement from './pages/table-management/TableManagement';
import Loading from './pages/loading/Loading';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Login from './pages/signin/SignIn'
import Logout from './SignOut'
import VerifyEmail from './pages/verify-email/VerifyEmail';

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
      return <Loading/>;
    }

    return (
        <Routes>
            <Route element={ <PrivateRoute user={user} /> } >
                <Route exact element={ <Navbar /> }>
                    <Route path='/' exact element={<OrderList user={ user } />} />
                    <Route path='/payment' exact element={ <Payment user={ user }/> } />
                    <Route path='/archive' exact element={ <Archive user={ user }/> } />
                    <Route path='/fooditems' exact element={ <FoodItems user={ user }/> } />
                    <Route path='/categoryitems' exact element={ <CategoryItems user={ user }/> } />
                    <Route path='/generate' exact element={ <Generate user={ user }/> } />
                    <Route path='/table-management' exact element={ <TableManagement user={ user }/> } />
                    <Route path='/logout' element={ <Logout user={ user }/> } />
                </Route>
            </Route>
            <Route path='/signup' exact element={ <SignUp/> } />
            <Route path='/login' exact element={ <Login/> } />
            <Route path='/verifyemail' exact element={ <VerifyEmail/> } />  
            <Route path='/forgotpassword' exact element={ <ForgotPassword/> } />
        </Routes>
    )
}

export default RouteMenu;