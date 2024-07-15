import React from 'react';
import { Helmet } from 'react-helmet';
import Login from '../../components/Auth/Login';
import styles from '../../styles/Style.module.css';

const LoginPage = () => {
  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Login />
    </div>
  );
};

export default LoginPage;
