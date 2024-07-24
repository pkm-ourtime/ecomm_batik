import React from 'react';
import { Helmet } from 'react-helmet';
import CartList from '../../../components/Dashboard/User/CartList';
import styles from '../../../styles/Style.module.css';

const ViewCart = () => {
  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>My Cart</title>
      </Helmet>
      <CartList />
    </div>
  );
};

export default ViewCart;
