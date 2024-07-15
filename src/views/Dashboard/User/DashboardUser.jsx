import React from 'react';
import { Helmet } from 'react-helmet';
import UserProductList from '../../../components/Dashboard/User/UserProductList';

const DashboardUserPage = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <UserProductList />
    </div>
  );
};

export default DashboardUserPage;
