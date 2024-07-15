import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Home from '../../components/Dashboard/Home/HomeSection';
import KatalogSection from '../../components/Dashboard/Home/KatalogSection';
import LayananSection from '../../components/Dashboard/Home/LayananSection';
import TentangKamiSection from '../../components/Dashboard/Home/TentangKamiSection'
import styles from '../../styles/Style.module.css';
import Footer from '../../components/Footer';

const HomePage = () => {
  return (
    <div id={styles.bg} className='flex flex-col'>
      <Helmet>
        <title>Melajoe Batik</title>
      </Helmet>   
      <Header />
      
      {/* Home Section */}
      <section id="home" className={`flex-grow ${styles['mySections']}`}>
        <Home />
      </section>
      
      {/* Katalog Section */}
      <section id="katalog" className={`flex-grow ${styles['mySections']}`}>
        <KatalogSection />
      </section>

      {/* Layanan Section */}
      <section id='layanan' className={`flex-grow ${styles['mySections']}`}>
        <LayananSection />
      </section>

      {/* Layanan Section */}
      <section id='tentang-kami' className={`flex-grow ${styles['mySections']}`}>
        <TentangKamiSection />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
