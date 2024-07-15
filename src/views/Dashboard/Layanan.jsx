import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Layanan from '../../components/Dashboard/Layanan';
import styles from '../../styles/Style.module.css';

const LayananPage = () => {
    return (
      <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
        <Helmet>
          <title>Layanan - Melajoe Batik</title>
        </Helmet>   
        <Header />
        <Layanan />
      </div>
    );
  };
  
export default LayananPage;