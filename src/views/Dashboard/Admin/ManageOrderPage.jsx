import React from 'react';
import { Helmet } from 'react-helmet';
import ManageOrder from '../../../components/Dashboard/Admin/ManageOrder';

const ManageOrderPage = () => {
  return (
    <div>
        <Helmet>
            <title>Management Order</title>
        </Helmet>
        <ManageOrder />
    </div>
  )
}

export default ManageOrderPage