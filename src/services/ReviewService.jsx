import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const addReview = async ( product, rating, comment ) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/review`, {product, rating, comment},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('failed to adding review product', error.message);
        throw error;
    }
}

export const getReview = async ( productId ) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/review/product/${productId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('failed getting review product by product id', error.message);
        throw error;
    }
}

export const updateReview = async (reviewId, rating, comment) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(`${API_URL}/review/${reviewId}`, { rating, comment },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('failed to update review by review id', error.message);
        throw error;
    }
}

export const deleteReview = async ( reviewId ) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/review/${reviewId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('failed to deleting review by review id', error.message)
        throw error;
    }
}