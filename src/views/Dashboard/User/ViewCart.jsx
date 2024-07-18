import React from 'react';
import { Helmet } from 'react-helmet';
import CartList from '../../../components/Dashboard/User/CartList';

const ViewCart = () => {
  return (
    <div>
      <Helmet>
        <title>All Cart</title>
      </Helmet>
      <CartList />
    </div>
  );
};

export default ViewCart;
