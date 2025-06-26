import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";

const news = [
  {
    id: 1,
    title: "Global Climate Summit Calls for Urgent Action",
    description:
      "World leaders gather to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
    image: news1,
  },
  {
    id: 2,
    title: "Breakthrough in AI Technology Announced",
    description:
      "Researchers announce a major breakthrough in artificial intelligence with new advancements set to revolutionize healthcare, finance, and more.",
    image: news2,
  },
  {
    id: 3,
    title: "New Space Mission Aims to Explore Distant Galaxies",
    description:
      "NASA unveils plans for a new space mission to explore distant galaxies, aiming to uncover insights into the origins of the universe.",
    image: news3,
  },
  {
    id: 4,
    title: "Stock Markets Reach Record Highs Amid Economic Recovery",
    description:
      "Global stock markets hit record highs as economic recovery accelerates post-pandemic, boosting investor confidence.",
    image: news4,
  },
  {
    id: 5,
    title: "Innovative New Smartphone Released by Tech Giant",
    description:
      "A tech giant launches its latest smartphone, featuring cutting-edge technology, improved battery life, and a sleek design.",
    image: news2,
  },
];

const News = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          📰 Latest News
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper">
          {news.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row h-full">
                {/* Image */}
                <div className="md:w-1/2 w-full h-60 md:h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between md:w-1/2 space-y-4">
                  <div>
                    <Link to="/" className="group">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="w-8 h-1 bg-gray-200 mt-2 mb-4 rounded-full"></div>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      to="/"
                      className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default News;
