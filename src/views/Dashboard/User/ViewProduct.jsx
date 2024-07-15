import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import UserProductDetails from '../../../components/Dashboard/User/UserProductDetails';
import { getProductById } from '../../../services/ProductService';

const ViewProduct = () => {
    const { id } = useParams(); 
    const [productName, setProductName] = useState('');

    useEffect(() => {
        fetchProductName();
    });

    const fetchProductName = async () => {
        try {
        const product = await getProductById(id);
        setProductName(product.name);
        } catch (error) {
        console.error('Error fetching product name:', error);
        }
    };
    fetchProductName();

    return (
        <div>
        <Helmet>
            <title>{productName ? `View Product - ${productName}` : 'View Product'}</title>
        </Helmet>
        <UserProductDetails />
        </div>
    );
};

export default ViewProduct;
