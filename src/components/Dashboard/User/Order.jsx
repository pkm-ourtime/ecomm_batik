import React, { useEffect, useState } from 'react';
import { getOrder } from '../../../services/OrderService';
import { Link } from 'react-router-dom';
import toRupiah from '@develoka/angka-rupiah-js';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrder();
      setOrders(fetchedOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">My Orders</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
          <Link to="/dashboard">Back to Dashboard</Link>
        </button>
      </div>
      <div className="bg-dark p-4 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-400">
            {orders.length > 0 ? (
              orders.map((order, orderIndex) => (
                <React.Fragment key={order._id}>
                  {order.items.map((item, itemIndex) => (
                    <tr
                      key={itemIndex}
                      className={`border-b border-gray-700 ${itemIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}
                    >
                      <td className="px-6 py-4 text-gray-300">
                        {itemIndex === 0 ? orderIndex + 1 : ""}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-300"><strong>Product Name:</strong> {item.product.name}</p>
                          <p className="text-gray-300"><strong>Description:</strong> {item.product.description}</p>
                          <p className="text-gray-300"><strong>Quantity:</strong> {item.quantity}</p>
                          <p className="text-gray-300"><strong>Price:</strong> {toRupiah(item.product.price).replace(",00", "")}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {itemIndex === 0 ? toRupiah(order.totalAmount).replace(",00", "") : ""}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {order.status}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
