import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        localStorage.setItem('token', response.data.token);

        if (!response.data) {
            throw new Error('Login failed');
        }

        return response.data.token;
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};

export const register = async (username, email, password, bio = null, hp = null, jenis_kelamin = null) => {
    try {
        const payload = { username, email, password };

        if (bio) payload.bio = bio;
        if (hp) payload.hp = hp;
        if (jenis_kelamin) payload.jenis_kelamin = jenis_kelamin;

        const response = await axios.post(`${API_URL}/users/register`, payload);

        if (!response.data) {
            throw new Error('Registration failed');
        }

        alert("Registration Successfull");
        return response.data;
    } catch (err) {
        console.error('Error registering: ', err.message);
        throw err;
    }
};


export const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  };