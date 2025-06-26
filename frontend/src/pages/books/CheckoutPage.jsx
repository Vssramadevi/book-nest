import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Order Placed 🎉",
        text: "Your order has been successfully placed!",
        icon: "success",
        confirmButtonText: "Great!",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order", error);
      Swal.fire(
        "Oops!",
        "Something went wrong while placing your order.",
        "error"
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🧾 Checkout - Cash on Delivery
          </h2>
          <p className="text-gray-600">
            Items: {cartItems.length}, Total: <strong>${totalPrice}</strong>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left Section */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-200"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">Name is required.</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-200"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    Phone number is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser?.email}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Address
                </label>
                <input
                  {...register("address", { required: true })}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    City
                  </label>
                  <input
                    {...register("city", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    {...register("zipcode", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    {...register("country", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    State
                  </label>
                  <input
                    {...register("state", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="form-checkbox"
                />
                <label className="text-gray-700 text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/policy" className="text-blue-600 underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={!isChecked}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200 ${
                  !isChecked ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
