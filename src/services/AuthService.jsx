import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });

        if (!response.data) {
            throw new Error('Login failed');
        }

        return response.data.token;
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};

export const register = async (username, email, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, {username, email, password, role});

        if (!response.data) {
            throw new Error('Registration failed');
        }
        return response.data.token;
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

export const roleValidation = async (Component, allowedRoles) => {
    return (props) => {
        const role = localStorage.getItem('role');

        if (!allowedRoles.includes(role)) {
            return <Navigate to="/unauthorized" />;
        } else {
            return <Component {...props} />;
        }
    }
}