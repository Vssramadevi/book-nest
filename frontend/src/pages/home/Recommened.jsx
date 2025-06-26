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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 px-10">
          <h2 className="text-3xl font-bold text-gray-800">
            📚 Recommended for You
          </h2>
          <div className="text-sm text-gray-500 hidden md:block">
            Showing {books.slice(8, 18).length} curated picks
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-gray-500">
            Loading recommendations...
          </div>
        ) : books.length > 0 ? (
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
              background: "linear-gradient(to right, #e0f2fe, #c7d2fe)",
              padding: "3rem 2rem",
              color: "white",
            }}
            className="mySwiper">
            {books.slice(8, 18).map((book, index) => (
              <SwiperSlide key={index} className="h-full">
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">
            No recommended books available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default Recommened;
