import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../../../services/CartService";
import { checkOutFromCart } from "../../../services/OrderService";
import toRupiah from '@develoka/angka-rupiah-js'

const Cartlist = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
        calculateTotalAmount(items);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      if (quantity < 1) {
        await deleteCartItem(id);
        const updatedCartItems = await getCartItems();
        setCartItems(updatedCartItems);
        calculateTotalAmount(updatedCartItems);
      } else {
        const updateItem = await updateCartItem(id, quantity);
        const updatedCartItems = cartItems.map(item =>
          item._id === id ? { ...item, quantity: updateItem.quantity } : item
        );
        setCartItems(updatedCartItems);
        calculateTotalAmount(updatedCartItems);
      }
    } catch (error) {
      console.error("Error updating cart item:", error.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteCartItem(id);
      const updatedCartItems = await getCartItems();
      setCartItems(updatedCartItems);
      calculateTotalAmount(updatedCartItems);
    } catch (error) {
      console.error("Error deleting cart item:", error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOutFromCart();
      alert('Checkout successful!');
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error('Failed to check out', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-dark text-white">
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded-t-lg">
          <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark">
            <Link to="/dashboard">Back</Link>
          </button>
          <h2 className="text-center text-3xl font-bold text-primary">My Cart</h2>
          <div></div>
        </div>
        <table className="w-full text-sm text-left text-gray-300 bg-gray-900">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cartItems) && cartItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-700">
                <td className="px-6 py-4">{item.product.name}</td>
                <td className="px-6 py-4">
                  <div className="">
                    <button
                      className="bg-primary text-white rounded-r-lg px-3 py-1 hover:bg-primary-dark"
                      onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      className="w-20 text-center bg-gray-700 text-gray-300 border border-gray-600"
                      type="number"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="bg-primary text-white rounded-l-lg px-3 py-1 hover:bg-primary-dark"
                      onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-800 text-gray-300">
            <tr>
              <td className="text-center px-6 py-4 font-bold">Total Amount:</td>
              <td className="px-6 py-4 font-bold">{toRupiah(totalAmount).replace(",00", "")}</td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                  onClick={handleCheckOut}
                >
                  Check Out
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Cartlist;
