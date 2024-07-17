import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, roles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const userRole = localStorage.getItem('role');

    if (!roles.includes(userRole)) {
      return <Navigate to="/login" />;
    }

    return <Component />;
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
