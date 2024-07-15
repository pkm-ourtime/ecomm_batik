import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from '../views/Dashboard/Admin/DashboardAdmin';
import EditProductPage from '../views/Dashboard/Admin/EditProductPage';
import AddProductPage from '../views/Dashboard/Admin/AddProductPage';
import AddProductCategoryPage from '../views/Dashboard/Admin/AddProductCategoryPage';
import PrivateRoute from '../components/PrivateRoute';

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrivateRoute element={DashboardAdmin} />} />
        <Route path="add-product" element={<PrivateRoute element={AddProductPage} />} />
        <Route path="edit-product/:id" element={<PrivateRoute element={EditProductPage} />} />
        <Route path="add-product-category" element={<PrivateRoute element={AddProductCategoryPage} />} />
    </Routes>
  );
};

export default AdminRoutes;
