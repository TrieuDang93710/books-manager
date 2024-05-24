import { ChevronLeft, ChevronRight } from "react-feather";
import flashSale from "../../../assets/images/flashsale.svg";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useState, useEffect } from "react";
import { bookApi } from '../../../services';
import { Link } from "react-router-dom";

const FlashSale = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await bookApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const [randomBooks, setRandomBooks] = useState([]);
  useEffect(() => {
    const getRandomBooks = () => {
      const allBooks = categories.flatMap((category) =>
        category.bookTypes.flatMap((bookType) => bookType.books)
      );

      const shuffledBooks = allBooks.sort(() => 0.5 - Math.random());
      const selectedBooks = shuffledBooks.slice(0, 10);
      setRandomBooks(selectedBooks);
    };

    getRandomBooks();
  }, [categories]);

  return (
    <div className="w-full">
      <div className="bg-white px-6 py-4 flex justify-between items-center rounded-lg">
        <a href="/">
          <img src={flashSale} alt="" />
        </a>
        <a href="/" className="text-blue-600 flex items-center">
          Xem tất cả <ChevronRight size={24} />
        </a>
      </div>
      <div className="relative mt-4">
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          slidesPerGroup={5}
          spaceBetween={12}
          slidesPerView={5}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {randomBooks.map((book) => (
            <SwiperSlide key={book._id}>
              <Link to={`/books/${book._id}`}>
                <div className="bg-white hover:custom-shadow rounded-lg flex flex-col items-start p-2 pb-4 cursor-pointer">
                  <div className="h-[268px] max-sm:h-[200px] w-full">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="rounded-lg"
                    />
                    <p className="text-sm mt-1 line-clamp-2 text-ellipsis overflow-hidden">
                      {book.name}
                    </p>
                  </div>
                  <div className="flex gap-2 text-secondary my-1">
                    <p>{`${(
                      book.price -
                      (book.price * book.sales) / 100
                    ).toLocaleString("vi-VN")} đ`}</p>
                    <div className="bg-secondary text-white text-[11px] rounded-md p-1">{`-${book.sales}%`}</div>
                  </div>
                  <p className="text-gray-500 text-sm line-through">
                    {book.price.toLocaleString("vi-VN")}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 flex items-center justify-between">
          <div className="prev custom-button -translate-x-1/2 p-2">
            <ChevronLeft />
          </div>
          <div className="next custom-button translate-x-1/2 p-2">
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
