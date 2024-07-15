import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const getUserCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/cart`, { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    throw error;
  }
};

export const addToCart = async (userId, productId, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart`, {
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      throw error;
    }
  };

  export const removeFromCart = async (cartId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/cart/${cartId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error.message);
      throw error;
    }
  };
  