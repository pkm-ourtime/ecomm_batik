import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthHooks from '../hooks/AuthHooks';

const PrivateRoute = ({ element: Component }) => {
  const isAuth = AuthHooks();

  return isAuth ? <Component /> : <Navigate to="/dashboard-admin" />;
};

export default PrivateRoute;
