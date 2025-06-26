import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Recommened = () => {
  const { data: books = [], isLoading } = useFetchAllBooksQuery();

  return (
    <section className="py-20 pt-5 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Note */}
        <div className="pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <center>
            <h6 className="text-xl md:text-xl text-gray-800 tracking-tight">
              You’re in the right place. Tell us what titles or genres you’ve
              enjoyed in the past, and we’ll give you surprisingly insightful
              recommendations.
            </h6>
          </center>
        </div>
        {/* Header */}
        <div className="flex flex-col px-5 md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            📚 Recommended for You
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-md">
            A curated list based on your interests.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-400 text-lg animate-pulse">
            Loading recommendations...
          </div>
        ) : books.length > 0 ? (
          <Swiper
            style={{
              background: "linear-gradient(to right, #e0f2fe, #c7d2fe)",
              padding: "3rem 2rem",
            }}
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
            className="mySwiper">
            {books.length > 0 ? (
              books.slice(8, 18).map((book, index) => (
                <SwiperSlide key={index} className="h-full">
                  <BookCard book={book} />
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                No books are there at the moment.
              </div>
            )}
          </Swiper>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6M12 5v.01"
              />
            </svg>
            <p className="text-lg font-medium">
              No recommended books available right now.
            </p>
            <p className="text-sm mt-1 text-gray-400">
              Please check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommened;
