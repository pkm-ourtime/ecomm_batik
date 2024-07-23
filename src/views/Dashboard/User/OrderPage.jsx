import React from 'react'
import { Helmet } from 'react-helmet'
import OrderList from '../../../components/Dashboard/User/Order'

const OrderPage = () => {
  return (
    <div>
        <Helmet>
            <title>My Order</title>
        </Helmet>
        <OrderList />
    </div>
  )
}

export default OrderPage