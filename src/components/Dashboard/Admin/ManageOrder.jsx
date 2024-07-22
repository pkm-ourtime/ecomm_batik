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
        <div>
            <h1> Manage Orders</h1>
            <button>
                <Link to="/dashboard-admin">Back to Dashboard</Link>
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>
                        Product Name
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Total Price
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        action
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                {order.product.name}
                            </td>
                            <td>
                                {order.quantity}
                            </td>
                            <td>
                                {toRupiah(order.totalPrice).replace(",00", "")}
                            </td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteOrder(order._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>
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