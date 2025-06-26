import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getImgUrl } from "../../utils/getImgUrl";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
} from "../../redux/features/books/booksApi";
import Recommened from "../home/Recommened";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg animate-pulse">
        Loading book details...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Failed to load book information. Please try again.
      </div>
    );

  return (
    <>
      {/* single book */}
      <section className="py-5 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Image */}
            <div className="md:w-1/3 flex justify-center">
              <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                className="rounded-lg w-full h-80 object-contain bg-gray-100 p-4"
              />
            </div>

            {/* Details */}
            <div className="md:w-2/3 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {book.title}
                </h1>

                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Author:</span>{" "}
                  {book.author || "Unknown"}
                </p>

                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Published:</span>{" "}
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-700 mb-3 capitalize">
                  <span className="font-semibold">Category:</span>{" "}
                  {book.category}
                </p>

                <p className="text-gray-700 mt-4 leading-relaxed">
                  <span className="font-semibold block mb-1">Description:</span>
                  {book.description}
                </p>
              </div>

              {/* Action */}
              <div className="mt-8">
                <button
                  onClick={() => handleAddToCart(book)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-200">
                  <FiShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* recommended */}

      <Recommened />
    </>
  );
};

export default SingleBook;
