import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const addToCart = async (productId, quantity) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/cart`, {
      productId,
      quantity,
    },
    { headers: { Authorization: `Bearer ${token}`} }
  );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/cart`,
      { headers: { Authorization: `Bearer ${token}`} }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting cart item:", error.message);
    throw error;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/${cartItemId}`, { quantity },
      { headers: { Authorization: `Bearer ${token}`} }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/cart/${cartItemId}`,
      { headers: { Authorization: `Bearer ${token}`} });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
};
