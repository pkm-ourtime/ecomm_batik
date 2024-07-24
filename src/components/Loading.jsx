import React from 'react';
import styles from '../styles/Style.module.css'

const Loading = () => {
  return (
    <div className="fixed flex justify-center items-center w-full h-full">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;