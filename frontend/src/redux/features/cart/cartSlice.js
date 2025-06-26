import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
          icon: "success",
          title: "✅ Added to Cart",
          text: action.payload.title,
          position: "center",
          background: "#f9fafb",
          color: "#1f2937",
          showConfirmButton: true,
          timer: 3500,
          customClass: {
            popup: "rounded-xl shadow-lg border border-gray-200",
            title: "text-lg font-semibold",
            icon: "text-green-500",
          },
        });
      } else {
        Swal.fire({
          title: "Already in Cart",
          text: "This product is already in your cart.",
          icon: "warning",
          background: "#fffbea",
          confirmButtonColor: "#6366f1",
          cancelButtonColor: "#f87171",
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-lg shadow-md",
            title: "text-base font-bold text-yellow-600",
            confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded",
          },
        });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Swal.fire({
        icon: "info",
        title: "Removed",
        text: `${action.payload.title} was removed from your cart.`,
        timer: 3500,
        showConfirmButton: true,
        background: "#fef2f2",
        color: "#991b1b",
        customClass: {
          popup: "rounded-lg shadow border border-red-200",
          icon: "text-red-500",
        },
      });
    },

    clearCart: (state) => {
      state.cartItems = [];
      Swal.fire({
        icon: "error",
        title: "Cart Cleared",
        text: "All items have been removed from your cart.",
        background: "#fff1f2",
        color: "#7f1d1d",
        showConfirmButton: true,
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "rounded-md shadow border border-red-300",
        },
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
