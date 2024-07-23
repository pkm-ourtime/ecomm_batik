import React, { useEffect, useState } from 'react';
import { getOrder } from '../../../services/OrderService';
import { Link } from 'react-router-dom';
import toRupiah from '@develoka/angka-rupiah-js'

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600">
          <Link to="/dashboard">Back to Dashboard</Link>
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, orderIndex) => (
              <React.Fragment key={order._id}>
                {order.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {itemIndex === 0 ? orderIndex + 1 : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      <div>
                        <p><strong>Product Name:</strong> {item.product.name}</p>
                        <p><strong>Description:</strong> {item.product.description}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> {toRupiah(item.product.price).replace(",00", "")}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {itemIndex === 0 ? toRupiah(order.totalAmount).replace(",00", "") : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                     {order.status}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Order