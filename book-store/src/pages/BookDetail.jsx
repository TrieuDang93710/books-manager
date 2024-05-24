import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { bookApi, cartApi } from "../services";
import { Plus, Minus, ShoppingCart } from "react-feather";

const BookDetail = ({ customerId }) => {
  const [count, setCount] = useState(1);
  const location = useLocation();
  const { pathname } = location;
  const bookId = pathname.split("/").pop();
  const [book, setBook] = useState(null);

  const decreaseCount = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const increaseCount = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 10));
  };

  useEffect(() => {
    bookApi
      .getBookById(bookId)
      .then((data) => setBook(data))
      .catch((error) => console.error("Error:", error));
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
    try {
      const result = await cartApi.addToCart(customerId, book._id, count);

      console.log("Added to cart:", result);

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <main>
      <section
        key={book._id}
        className="padding-x bg-primary py-4 min-h-screen"
      >
        <div className="p-4 flex bg-white rounded-lg">
          <img src={book.image} alt="" className="object-cover h-96" />
          <div className="flex relative flex-col w-full px-12">
            <h2 className="text-[#333] text-[22px] font-semibold">
              {book.name}
            </h2>
            <div className="flex mt-4">
              <div className="flex flex-col gap-4 w-8/12">
                <div className="text-sm">
                  <p>
                    Nhà cung cấp:{" "}
                    <span className="font-semibold text-[#2489F4]">
                      Kim Đồng
                    </span>
                  </p>
                  <p className="mt-1">
                    Nhà xuất bản: <span className="font-semibold">Nhóm 13</span>
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <h2 className="text-4xl text-secondary font-semibold">{`${(
                    book.price -
                    (book.price * book.sales) / 100
                  ).toLocaleString("vi-VN")} đ`}</h2>
                  <p className="text-base line-through">
                    {`${book.price.toLocaleString("vi-VN")} đ`}
                  </p>
                  <div className="bg-secondary text-white text-base font-semibold rounded-md px-1">{`-${book.sales}%`}</div>
                </div>
                <div className="flex items-center gap-20 mt-2 font-bold">
                  <h3 className="text-gray-600">Số lượng: </h3>
                  <div className="flex items-center justify-between border text-gray-500 border-gray-400 w-32 py-1 px-3 rounded-md">
                    <button onClick={decreaseCount}>
                      <Minus size={18} />
                    </button>
                    <span className="text-black">{count}</span>
                    <button onClick={increaseCount}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Tác giả: <span className="font-semibold">{book.author}</span>
              </p>
            </div>

            <div className="absolute bottom-0 gap-7 flex text-[15px]">
              <button
                onClick={handleAddToCart}
                className="flex w-56 justify-center text-secondary py-3 font-bold gap-4 border-2 border-secondary rounded-lg"
              >
                <ShoppingCart className="text-secondary" size={22} />
                Thêm vào giỏ hàng
              </button>
              <div className="flex w-56 text-white justify-center py-3 font-bold gap-4 bg-secondary rounded-lg">
                Mua ngay
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg mt-4 p-5">
          <h2 className="font-semibold text-xl">Mô Tả</h2>
          <div className="font-semibold mt-5">{book.name}</div>
          <div className="">{book.description}</div>
        </div>
      </section>
    </main>
  );
};

export default BookDetail;
