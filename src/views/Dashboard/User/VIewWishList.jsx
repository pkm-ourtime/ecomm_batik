import React from 'react'
import { Helmet } from 'react-helmet'
import WishList from '../../../components/Dashboard/User/WishList'
import styles from '../../../styles/Style.module.css';

const VIewWishList = () => {
  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>
      <WishList />
    </div>
  )
}

export default VIewWishList