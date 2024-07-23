import React, { useEffect, useState } from 'react'
import {
    getOrder,
    updateOrderStatus,
    deleteOrder,
} from '../../../services/OrderService';
import { Link } from 'react-router-dom';
import toRupiah from '@develoka/angka-rupiah-js';

const ManageOrder = () => {
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

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
        const updatedOrder = await updateOrderStatus(orderId, status);
        setOrders(
            orders.map((order) =>
                order._id === orderId ? { ...order, status: updatedOrder.status } : order
            )
        );
    } catch (error) {
        console.error('Error updating order status:', error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
        await deleteOrder(orderId);
        const newOrder = await getOrder();
        setOrders(newOrder);
    } catch (error) {
        console.error('"error deleting order:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
    <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-3xl font-bold'> Manage Orders</h1>
            <button className='bg-primary text-white px-4 py-2 rounded hover:bg-orange-600'>
                <Link to="/dashboard-admin">Back to Dashboard</Link>
            </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Product Details
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-2 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
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
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {order.user.username}
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
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="bg-white border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {itemIndex === 0 && (
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      )}
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

export default ManageOrder;