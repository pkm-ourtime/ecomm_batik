import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No auth token found');
  }
  return token;
};

export const getProducts = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by id:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/products/${productId}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data?.message || error.message);
    throw error;
  }
};
