import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const addProductToWishlist = async (productId) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/wishlist`, { productId },
            { headers: { Authorization: `Bearer ${token}`} });
        return response.data;
    } catch (error) {
        console.error("Error to adding product to wishlist", error.message);
        throw error;
    }
};

export const getWishList = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/wishlist`, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error get wishlist", error.message);
        throw error;
    }
};

export const removeProductFromWishList = async (productId) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/wishlist`, { productId },
            { headers: {Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error(" Error remove product from wishlist ", error.message);
        throw error;
    }
};