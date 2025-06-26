import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Loading your dashboard...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">Failed to load orders.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {currentUser?.name || "User"}!
        </h1>
        <p className="text-gray-600 mb-6">
          Here’s a summary of your recent orders.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Order History
          </h2>
          {orders.length > 0 ? (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-purple-700">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Total:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Items:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {order.productIds.map((productId, idx) => (
                        <li key={idx}>{productId}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              You haven't placed any orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
