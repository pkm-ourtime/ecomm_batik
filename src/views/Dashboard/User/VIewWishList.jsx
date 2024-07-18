import React from 'react'
import { Helmet } from 'react-helmet'
import WishList from '../../../components/Dashboard/User/WishList'

const VIewWishList = () => {
  return (
    <div>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>
        <WishList />
    </div>
  )
}

export default VIewWishList