import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import TentangKami from '../../components/Dashboard/TentangKami';
import styles from '../../styles/Style.module.css';

const TentangKamiPage = () => {
    return (
      <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
        <Helmet>
          <title>Tentang Kami - Melajoe Batik</title>
        </Helmet>   
        <Header/>
        <TentangKami/>
      </div>
    );
  };
  
export default TentangKamiPage;