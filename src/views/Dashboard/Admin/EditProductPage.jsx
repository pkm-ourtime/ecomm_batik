import React from 'react';
import { Helmet } from 'react-helmet';
import { EditProductForm } from '../../../components/Dashboard/Admin/EditProductForm';

const EditProductPage = () => {
  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <EditProductForm />
    </div>
  );
};

export default EditProductPage;
