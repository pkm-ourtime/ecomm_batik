import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProductCategory } from '../../../services/ProductCategoryService';

const AddProductCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set loading to false after the component has mounted
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProductCategory({ name, description });
      navigate('/dashboard-admin');
    } catch (error) {
      console.error('Error adding product category:', error);
      setError('Failed adding product category. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-36 max-w-lg my-10 border border-gray-200 rounded-xl mx-auto p-5 shadow-md font-serif group">
      <h2 className="font-bold text-center text-gray-700 text-lg mb-3">Add Product Category</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <form id="addProductCategoryForm" onSubmit={handleSubmit}>
          <div className="w-full lg:w-2/3 lg:mx-auto">
            <div className="w-full px-4 mb-8">
              <label htmlFor="categoryName" className="text-base text-primary font-bold">Name:</label>
              <input
                type="text"
                id="categoryName"
                className="w-full bg-gray-200 text-gray-700 p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full px-4 mb-8">
              <label htmlFor="categoryDescription" className="text-base text-primary font-bold">Description:</label>
              <input
                type="text"
                id="categoryDescription"
                className="w-full bg-gray-200 text-gray-700 p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full px-4 mb-4">
              <button
                className="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full w-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                type="submit"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProductCategoryForm;
