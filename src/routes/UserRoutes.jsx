import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardUserPage from '../views/Dashboard/User/DashboardUser';
import ViewCart from '../views/Dashboard/User/ViewCart';
import VIewWishList from '../views/Dashboard/User/VIewWishList';
import PrivateRoute from '../services/PrivateRoute';
import OrderList from '../views/Dashboard/User/OrderPage'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrivateRoute element={DashboardUserPage} roles={['user']}/>} />
        <Route path="cart-list" element={<ViewCart />} />
        <Route path='wish-list' element={<VIewWishList />} />
        <Route path='order-list' element={<OrderList />} />
    </Routes>
  );
};

export default UserRoutes;