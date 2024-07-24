import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProductCategory } from '../../../services/ProductCategoryService';
import Loading from '../../Loading';

const AddProductCategoryForm = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProductCategory({ name, description });
      onClose();
      navigate('/dashboard-admin');
    } catch (error) {
      console.error('Error adding product category:', error);
      setError('Failed adding product category. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-dark p-8 rounded-lg relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="text-primary absolute top-4 right-4 hover:text-gray-500 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="font-bold text-center text-primary text-3xl mb-6">
          Add Product Category
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form id="addProductCategoryForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-base text-primary font-bold mb-2">Name:</label>
            <input
              type="text"
              id="categoryName"
              className="w-full bg-gray-200 text-primary p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryDescription" className="block text-base text-primary font-bold mb-2">Description:</label>
            <input
              type="text"
              id="categoryDescription"
              className="w-full bg-gray-200 text-primary p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="font-semibold text-white bg-red-500 py-2 px-4 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
            >
              Close
            </button>
            <button
              type="submit"
              className="font-semibold text-white bg-green-500 py-2 px-4 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategoryForm;
