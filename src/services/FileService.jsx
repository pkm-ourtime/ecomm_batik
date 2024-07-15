import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const uploadFile = async (imageData) => {
    try {
        const response = await axios.post(`${API_URL}/files/upload`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (err) {
        console.error('Failed upload image:', err.message);
        throw err;
    }
};

export const deleteFile = async (imageName) => {
    try {
        const response = await axios.delete(`${API_URL}/files/delete/${imageName}`);
        return response.data;
    } catch (err) {
        console.error('Failed delete image:', err.message);
        throw err;
    }
}