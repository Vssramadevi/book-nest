import React from "react";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../../../redux/features/books/booksApi";
import { Link, useNavigate } from "react-router-dom";

const ManageBooks = () => {
  const navigate = useNavigate();
  const {
    data: books = [],
    refetch,
    isLoading,
    isError,
  } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error.message);
      alert("Failed to delete book. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Loading books...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-lg">
          Error loading books. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
          <Link
            to="/dashboard/add-new-book"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 text-sm">
            + Add New Book
          </Link>
        </div>

        {books.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {books.map((book, index) => (
                  <tr key={book._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {book.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {book.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                      ${book.newPrice}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        to={`/dashboard/edit-book/${book._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mr-4">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageBooks;
