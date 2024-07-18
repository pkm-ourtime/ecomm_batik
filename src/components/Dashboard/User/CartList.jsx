import React, { useEffect, useState } from 'react'
import { getCartItems, updateCartItem, deleteCartItem } from '../../../services/CartService'

const Cartlist = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect (() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCartItems();
                setCartItems(items);
            } catch (error) {
                console.error('Error fetching cart items:', error.message);
            }
        };

        fetchCartItems();
    }, []);

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            const updateItem = await updateCartItem(id, quantity);
            setCartItems(cartItems.map(item => item._id === id ? updateItem : item));
        } catch (error) {
            console.error('Error updating cart item:', error.message);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteCartItem(id);
            setCartItems(cartItems.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting cart item:', error.message);
        }
    };

  return (
    <div>
        <h2>My Cart</h2>
        <ul>
            {cartItems.map(item => (
                <li key={item._id}>
                    <span>{item.product.name}</span>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                    <button onClick={() => handleDeleteItem(item._id)}>Remove</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Cartlist