import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="h-full max-h-[480px] rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/60">
      <div className="flex flex-col sm:flex-row h-full gap-6 p-5">
        {/* Book Image */}
        <div className="sm:w-44 w-full flex-shrink-0">
          <Link to={`/books/${book._id}`}>
            <img
              src={getImgUrl(book?.coverImage)}
              alt={book?.title || "Book cover"}
              className="w-full h-60 object-contain border border-gray-100 p-2 rounded-lg bg-gray-50 group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Book Info */}
        <div className="flex flex-col justify-between flex-1 overflow-hidden">
          <div className="flex flex-col gap-2 overflow-hidden">
            <Link to={`/books/${book._id}`}>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {book?.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {book?.description}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
            <p className="text-lg font-semibold text-gray-800">
              ${book?.newPrice}
              <span className="ml-2 line-through text-sm text-gray-500 font-normal">
                ${book?.oldPrice}
              </span>
            </p>

            <button
              onClick={() => handleAddToCart(book)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200">
              <FiShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
