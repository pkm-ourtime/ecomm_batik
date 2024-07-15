import React from 'react';
import { Helmet } from 'react-helmet';
import AddProductForm from '../../../components/Dashboard/Admin/AddProductForm';

const AddProductPage = () => {
  return (
    <div>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
