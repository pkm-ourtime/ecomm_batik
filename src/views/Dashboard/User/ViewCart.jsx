import React from 'react';
import { Helmet } from 'react-helmet';
import UserCartList from '../../../components/Dashboard/User/CartList';

const ViewCart = () => {
  return (
    <div>
      <Helmet>
        <title>All Cart</title>
      </Helmet>
      <UserCartList />
    </div>
  );
};

export default ViewCart;
