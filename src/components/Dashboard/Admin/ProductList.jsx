import React, { useState, useEffect } from 'react';
import toRupiah from '@develoka/angka-rupiah-js';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../services/ProductService';
import { getProductCategory } from '../../../services/ProductCategoryService';
import { logout } from '../../../services/AuthService';
import AddProductForm from './AddProductForm';
import { deleteFile } from '../../../services/FileService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
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

  const handleDelete = async (productData) => {
    const imageUrl = productData.image_url;
    const parseUrl = imageUrl.split('/');
    const imageName = parseUrl[parseUrl.length - 1];
    const encodedImageName = encodeURIComponent(imageName);
    
    try {
      await deleteFile(encodedImageName);
      await deleteProduct(productData._id);
      setProducts(products.filter(product => product._id !== productData._id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again later.');
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-5 relative">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-primary">Product List</h1>
        <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600">Logout</button>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-white">Filter by Category</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="flex mb-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 mr-2 rounded hover:bg-orange-600">Add Product</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="max-w-sm bg-white p-4 rounded overflow-hidden shadow-md">
            <img src={product.image_url} alt={product.name} className="w-full h-auto max-h-48 object-cover mb-4 rounded" />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-500">{`Category: `}<br/>
                <span className="text-primary cursor-pointer" onClick={() => handleCategoryClick(product.category_id)}>{getCategoryName(product.category_id)}</span>
              </p>
              <p className="text-gray-700 font-bold">Price: {toRupiah(product.price, { floatingPoint: 0 })}</p>
            </div>
            <div className="mt-4 flex">
              <Link to={`/dashboard-admin/edit-product/${product._id}`} className="bg-primary text-center text-white px-4 py-2 rounded mr-2 hover:bg-orange-600 flex-grow">Edit</Link>
              <button onClick={() => handleDelete(product)} className="bg-red-500 text-center text-white px-4 py-2 rounded hover:bg-red-600 flex-grow">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="border border-orange-500 rounded-lg shadow-lg max-w-2xl w-full">
            <AddProductForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductList };
