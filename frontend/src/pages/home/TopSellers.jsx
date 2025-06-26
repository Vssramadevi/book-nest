import React, { useState } from "react";
import BookCard from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  return (
    <section className=" bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col px-4 md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">📚 Top Sellers</h2>

          {/* Category Dropdown */}
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 border border-gray-300 bg-white rounded-md px-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation]}
          style={{
            background:
              "linear-gradient(to left,rgba(58, 127, 56, 0.23),rgba(46, 149, 60, 0.54))",
            padding: "3rem 2rem",
          }}
          className="mySwiper">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <SwiperSlide key={index} className="h-full">
                <BookCard book={book} />
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              No books found for selected category.
            </div>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default TopSellers;
