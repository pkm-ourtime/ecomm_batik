import React from 'react';
import Register from '../../components/Auth/Register';
import { Helmet } from 'react-helmet';
import styles from '../../styles/Style.module.css';

const LoginPage = () => {
  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Register />
    </div>
  );
};

export default LoginPage;
