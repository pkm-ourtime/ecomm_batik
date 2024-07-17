import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/Dashboard/Home';
// import KatalogPage from '../views/Dashboard/Katalog';
// import LayananPage from '../views/Dashboard/Layanan';
// import TentangKamiPage from '../views/Dashboard/TentangKami';

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/katalog" element={<KatalogPage />} /> */}
        {/* <Route path="/layanan" element={<LayananPage />} />
        <Route path="/tentang-kami" element={<TentangKamiPage />} /> */}
    </Routes>
  );
};

export default UserRoutes;