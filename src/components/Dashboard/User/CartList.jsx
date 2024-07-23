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
          console.log("Updated item:", updateItem);
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
      const updateCartItems = await getCartItems();
      setCartItems(updateCartItems);
      calculateTotalAmount(updateCartItems);
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
  }

  return (
    <div className="container">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center my-2">
        <button className="rounded full bg-red-500 p-1">
            <Link to="/dashboard">Back</Link>
        </button>
        <h2 className="text-center text-3xl font-bold">My Cart</h2>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cartItems) && cartItems.map((item) => (
              <tr
                key={item._id}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.product.name}
                </th>
                <td class="px-6 py-4">
                <button
                    className="bg-white rounded-l-lg px-2 text-black"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <input className="w-7 text-center" type="number" value={item.quantity} readOnly />
                  <button
                    className="bg-white rounded-r-lg px-2 text-black"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                </td>
                <td class="px-6 py-4 text-center">
                  
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-center">
                Total Amount:
              </td>
              <td>{toRupiah(totalAmount).replace(",00", "")}</td>
              <td >
                <button className="rounded-full bg-blue-500 text-black p-1 my-1" onClick={handleCheckOut}>
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
