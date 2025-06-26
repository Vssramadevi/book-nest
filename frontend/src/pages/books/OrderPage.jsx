import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading)
    return <div className="text-center py-10 text-lg">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error retrieving orders data.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-gray-600">No orders found!</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-100 transition hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  Order #{index + 1}
                </span>
                <span className="text-sm text-gray-500">
                  <strong>Total:</strong> ${order.totalPrice}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </h3>

              <div className="text-gray-700 space-y-1">
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>

                <div className="mt-2">
                  <p className="font-semibold text-gray-800">
                    Shipping Address:
                  </p>
                  <p className="ml-2">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="font-semibold text-gray-800">Product IDs:</p>
                  <ul className="ml-4 list-disc text-sm text-gray-600 max-h-28 overflow-y-auto pr-2">
                    {order.productIds.map((productId) => (
                      <li key={productId}>{productId}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
