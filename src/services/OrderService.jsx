import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const checkOutFromCart = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/order`, {} ,{
            headers: { Authorization: `Bearer ${token}` } 
        });
        return response.data;
    } catch (error) {
        console.error('Failed to check out from cart', error.message);
        throw error;
    }
}

export const buyNow = async (productId, quantity) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/order/buynow`, {productId, quantity}, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to buy product', error.message);
        throw error;
    }
}

export const getOrder = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/order`,
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    } catch (error) {
        console.error('Failed to get order', error.message);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, status) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(`${API_URL}/order/${orderId}`, {status}, 
            { headers: {Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update status order by order id', error.message);
        throw error;
    }
}

export const deleteOrder = async (orderId) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/order/${orderId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('failed delete order by order id', error.message);
        throw error;
    }
}