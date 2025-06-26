import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🛒 Shopping Cart</h2>
        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          <p className="text-center text-gray-500 text-lg mt-10">
            Your cart is empty.
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow transition duration-300">
              🛍️ Continue Shopping
            </Link>
          </div>
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((product) => (
              <li
                key={product._id}
                className="flex items-center gap-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 mb-2">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <img
                    src={getImgUrl(product?.coverImage)}
                    alt={product?.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        <Link to={`/books/${product._id}`}>
                          {product.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        <strong>Category:</strong> {product.category}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <strong>Qty:</strong> 1
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-800">
                        ${product.newPrice}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 px-3 py-1 rounded transition duration-150 ease-in-out">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary Section */}
          <div className="border-t border-gray-200 pt-6 mt-10">
            <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <Link
                to="/checkout"
                className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition">
                Proceed to Checkout
              </Link>
              <Link
                to="/"
                className="text-blue-600 hover:underline text-sm font-medium">
                Continue Shopping &rarr;
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
