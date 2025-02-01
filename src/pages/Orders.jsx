import React, { useEffect, useState } from 'react';
import api from "../shared/axios.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api('/orders'); // Replace with your API endpoint
        setOrders(response.data.data); // Assuming 'data' is the key containing the orders
      } catch (error) {
        setError(error.message); // Set error if any
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
                <p className="text-gray-600">
                  <strong>Customer:</strong> {order.userId.fullname} ({order.userId.username})
                </p>
              </div>
              <div className={`text-sm py-1 px-3 rounded-full ${order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {order.status}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <strong>Products:</strong>
                <ul className="list-disc pl-5">
                  {order.products.map((product) => (
                    <li key={product._id} className="text-gray-800">
                      {product.name} - <span className="font-semibold">{product.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Total Price:</strong> <span className="text-lg font-semibold">${order.totalPrice}</span>
              </div>
            </div>

            <div className="text-gray-600">
              <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(order.updated_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
