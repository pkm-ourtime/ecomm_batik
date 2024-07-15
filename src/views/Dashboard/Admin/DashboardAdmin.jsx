import React from 'react';
import { Helmet } from 'react-helmet';
import { ProductList } from '../../../components/Dashboard/Admin/ProductList';
import styles from '../../../styles/Style.module.css';
import AuthHooks from '../../../hooks/AuthHooks';

const DashboardAdminPage = () => {
  const isAuth = AuthHooks();

  if (!isAuth) {
    return null;
  }

  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>Dashboard Admin</title>
      </Helmet>
      <ProductList />
    </div>
  );
};

export default DashboardAdminPage;
