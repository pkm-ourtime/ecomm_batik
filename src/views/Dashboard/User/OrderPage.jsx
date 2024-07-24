import React from 'react'
import { Helmet } from 'react-helmet'
import OrderList from '../../../components/Dashboard/User/Order'
import styles from '../../../styles/Style.module.css';

const OrderPage = () => {
  return (
    <div id={styles.bg} className='flex flex-col min-h-screen bg-no-repeat bg-cover'>
      <Helmet>
        <title>My Cart</title>
      </Helmet>
      <OrderList />
    </div>
  )
}

export default OrderPage