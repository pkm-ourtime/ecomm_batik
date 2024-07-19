import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getProductCategory = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/categories`,
      { headers: { Authorization: `Bearer ${token}`} });
    return response.data;
  } catch (error) {
    console.error('Error fetching product category:', error.message);
    throw error;
  }
};

export const createProductCategory  = async (productData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/categories`, productData,
      { headers: { Authorization: `Bearer ${token}`} });
    return response.data;
  } catch (error) {
    console.error('Error updating product category:', error.message);
    throw error;
  }
};

export const updateProductCategory  = async (productId, productData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/categories/${productId}`, productData,
      { headers: { Authorization: `Bearer ${token}`} });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.message);
    throw error;
  }
};

export const deleteProductCategory = async (productId) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/categories/${productId}`,
          { headers: { Authorization: `Bearer ${token}`} });
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
      }
};
