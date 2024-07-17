import React from 'react';
import { Helmet } from 'react-helmet';
import Katalog from '../../../components/Dashboard/User/Katalog';
import styles from '../../../styles/Style.module.css';

const DashboardUserPage = () => {
  return (
    <div id={styles.bg} className='flex flex-col min-h-screen'>
        <Helmet>
          <title>Katalog - Melajoe Batik</title>
        </Helmet>   
        <Katalog />
      </div>
  );
};

export default DashboardUserPage;
