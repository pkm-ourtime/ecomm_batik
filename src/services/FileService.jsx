import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No auth token found');
  }
  return token;
};

export const uploadFile = async (imageData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/files/upload`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    console.error('Failed upload image:', err.response?.data?.message || err.message);
    throw err;
  }
};

export const deleteFile = async (imageName) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/files/delete/${imageName}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err) {
    console.error('Failed delete image:', err.response?.data?.message || err.message);
    throw err;
  }
};
