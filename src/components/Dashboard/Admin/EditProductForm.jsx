import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../../services/ProductService';
import { getProductCategory } from '../../../services/ProductCategoryService';

const EditProductForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const product = await getProductById(id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.category !== null ? product.category.toString() : ''); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product. Please try again later.');
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getProductCategory();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, { name, description, price, category: categoryId });
      navigate('/dashboard-admin'); 
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to edit product. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="mt-36 max-w-lg my-10 border border-gray-200 rounded-xl mx-auto p-5 shadow-md font-serif group">
      <h2 className="font-bold text-center text-gray-700 text-lg mb-3">Edit Product</h2>
      <form id="editProductForm" onSubmit={handleSubmit}>
        <div className="w-full lg:w-2/3 lg:mx-auto">
          <div className="w-full px-4 mb-8">
            <label htmlFor="productName" className="text-base text-primary font-bold">Name:</label>
            <input type="text" id="productName" className="w-full bg-gray-200 text-gray-700 p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w-full px-4 mb-8">
            <label htmlFor="productDescription" className="text-base text-primary font-bold">Description:</label>
            <input type="text" id="productDescription" className="w-full bg-gray-200 text-gray-700 p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="w-full px-4 mb-8">
            <label htmlFor="productPrice" className="text-base text-primary font-bold">Price:</label>
            <input type="text" id="productPrice" className="w-full bg-gray-200 text-gray-700 p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="w-full px-4 mb-8">
            <label htmlFor="productCategory" className="text-base text-primary font-bold">Category:</label>
            <select id="productCategory" className="w-full bg-gray-200 text-gray-700 p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full px-4 mb-4">
            <button className="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full w-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out" type="submit">Update Product</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { EditProductForm };
