import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from '../views/Dashboard/Admin/DashboardAdmin';
import EditProductPage from '../views/Dashboard/Admin/EditProductPage';
import AddProductPage from '../views/Dashboard/Admin/AddProductPage';
import AddProductCategoryPage from '../views/Dashboard/Admin/AddProductCategoryPage';
import PrivateRoute from '../services/PrivateRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={DashboardAdmin} roles={['admin']} />} />
      <Route path="add-product" element={<PrivateRoute element={AddProductPage} roles={['admin']} />} />
      <Route path="edit-product/:id" element={<PrivateRoute element={EditProductPage} roles={['admin']} />} />
      <Route path="add-product-category" element={<PrivateRoute element={AddProductCategoryPage} roles={['admin']} />} />
    </Routes>
  );
};

export default AdminRoutes;
