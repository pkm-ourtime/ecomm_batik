import React from 'react';
import { Helmet } from 'react-helmet';
import AddProductCategoryForm from '../../../components/Dashboard/Admin/AddProductCategoryForm';

const AddProductCategoryPage = () => {
  return (
    <div>
      <Helmet>
        <title>Add Product Category</title>
      </Helmet>
      <AddProductCategoryForm />
    </div>
  );
};

export default AddProductCategoryPage;
