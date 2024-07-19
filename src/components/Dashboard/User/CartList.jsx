import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../../../services/CartService";

const Cartlist = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (id, quantity) => {
    try {
        if (quantity < 1) {
          await deleteCartItem(id);
          setCartItems(cartItems.filter((item) => item._id !== id));
        } else {
          const updateItem = await updateCartItem(id, quantity);
          console.log("Updated item:", updateItem);
          setCartItems(
            cartItems.map(item => item._id === id
                ? { ...item, quantity: updateItem.quantity }
                : item
          ));
        }
    } catch (error) {
      console.error("Error updating cart item:", error.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting cart item:", error.message);
    }
  };

  return (
    <div className="container">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center my-2">
        <button className="rounded full bg-red-500 p-1">
            <Link to="/dashboard">Back</Link>
        </button>
        <h2 className="text-center">My Cart</h2>
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
            {cartItems.map((item) => (
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
                <td class="px-6 py-4">{item.quantity}</td>
                <td class="px-6 py-4 text-center">
                  <button
                    className="bg-white rounded-l-lg px-2 mr-1 text-black"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="bg-white rounded-r-lg px-2 text-black"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
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
        </table>
      </div>
    </div>
  );
};

export default Cartlist;
