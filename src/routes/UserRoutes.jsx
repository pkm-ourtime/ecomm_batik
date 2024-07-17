import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardUserPage from '../views/Dashboard/User/DashboardUser';

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<DashboardUserPage />} />
    </Routes>
  );
};

export default UserRoutes;