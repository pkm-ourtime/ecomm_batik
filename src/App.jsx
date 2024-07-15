import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import LoginPage from './views/Auth/Login';
import RegisterPage from './views/Auth/Register';
import HomePage from './views/Dashboard/Home';
import Katalog from './views/Dashboard/Katalog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard-admin/*" element={<AdminRoutes />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/katalog" element={<Katalog />} />
      </Routes>
    </Router>
  );
};

export default App;
