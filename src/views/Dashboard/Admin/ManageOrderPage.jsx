import React from 'react';
import { Helmet } from 'react-helmet';
import ManageOrder from '../../../components/Dashboard/Admin/ManageOrder';
import styles from '../../../styles/Style.module.css';
import AuthHooks from '../../../hooks/AuthHooks';

const ManageOrderPage = () => {
  const isAuth = AuthHooks();

  if (!isAuth) {
    return null;
  }

  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>Dashboard Admin</title>
      </Helmet>
      <ManageOrder />
    </div>
  );
}

export default ManageOrderPage