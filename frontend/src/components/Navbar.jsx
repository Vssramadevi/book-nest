import { Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatarImg from "../assets/avatar.png";
import footerLogo from "../assets/footer-logo.png";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center justify-center gap-3">
            <img
              src={footerLogo}
              alt="Logo"
              style={{ width: "50px", height: "50px", marginTop: "10px" }}
              className="w-36 mb-5"
            />
            <Link to="/" className="text-3xl font-bold text-blue-600">
              BookNest
            </Link>
            {/* <HiMiniBars3CenterLeft className="text-xl text-gray-700 hover:text-blue-600 cursor-pointer" /> */}
          </div>

          {/* Centered Search */}
          <div className="hidden md:flex justify-center flex-1">
            <div className="relative w-72">
              <IoSearchOutline className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search books..."
                className="pl-10 pr-4 py-2 rounded-md w-full bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="relative flex items-center space-x-3 px-3">
            {/* User / Avatar Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none">
                  <img
                    src={avatarImg}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500 object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border rounded-md shadow-lg z-50 animate-fade-in-down">
                    <ul className="py-2 text-sm text-gray-700">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100 transition">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : token ? (
              <Link to="/dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                <HiOutlineUser className="text-xl" />
              </Link>
            )}

            {/* Wishlist */}
            <button
              type="button"
              className="hidden sm:inline-block text-gray-700 hover:text-pink-500 transition">
              <HiOutlineHeart className="text-xl" />
            </button>

            {/* Cart */}
            <div className="relative">
              <Link to="/cart" className="text-gray-700 hover:text-blue-600">
                <HiOutlineShoppingCart className="text-2xl" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
