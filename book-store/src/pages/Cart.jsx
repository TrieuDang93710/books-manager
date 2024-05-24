/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "react-feather";
import { cartApi } from "../services";
import { useNavigate } from "react-router-dom";

const Cart = ({ customerId }) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  const navigate = useNavigate();

  // ... (other parts of Cart component)

  useEffect(() => {
    // Kiểm tra xem có cuốn sách nào được chọn không
    setIsCheckoutDisabled(selectedBooks.length === 0);
  }, [selectedBooks]);


  // lấy dữ liệu cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartApi.getCart(customerId);
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [customerId]);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const handleCheckboxChange = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const handleCheckout = () => {
    navigate(`/payment/${customerId}`, { state: { selectedBooks, total, customerId } });
  };


  return (
    <div className="padding-x bg-primary py-4">
      <div className="flex gap-1 mb-4">
        <p className="text-xl font-semibold">GIỎ HÀNG</p>
        <span className="text-lg font-normal">
          ({cart.items.length} sản phẩm)
        </span>
      </div>
      <div className="flex gap-5">
        <div className="flex w-full flex-col">
          <div className="flex gap-5 items-center bg-white py-2 px-4 rounded-lg">
            <label className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  checked={isCheckedAll}
                  onChange={handleCheckboxChange}
                />
                <p>Chọn tất cả ({cart.items.length} sản phẩm)</p>
              </div>
              <div className="flex items-center gap-14 mr-20">
                <p>Số lượng</p>
                <p>Thành tiền</p>
              </div>
            </label>
          </div>
          <div className="bg-white mt-3 p-6 rounded-lg">
            <ul className="flex flex-col gap-5">
              {cart.items.map((item, index) => (
                <CartItem
                  key={item.book._id}
                  item={item}
                  index={index}
                  cart={cart}
                  isCheckedAll={isCheckedAll}
                  customerId={customerId}
                  setCart={setCart}
                  setTotal={setTotal}
                  setSelectedBooks={setSelectedBooks}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-6/12 bg-white flex flex-col rounded-lg py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="">Thành tiền</div>
            <p>{total.toLocaleString("vi-VN")} đ</p>
          </div>
          <hr className="h-1 border-t-2 w-full mt-2 mb-4 border-gray-300" />
          <button
            onClick={handleCheckout}
            disabled={isCheckoutDisabled}
            className={`rounded-lg text-lg font-bold text-white text-center py-2 ${
              isCheckoutDisabled ? 'bg-[#888888] cursor-not-allowed' : 'bg-secondary'
            }`}
          >
            THANH TOÁN
          </button>

        </div>
      </div>
    </div>
  );
};

const CartItem = ({
  item,
  index,
  cart,
  isCheckedAll,
  customerId,
  setCart,
  setTotal,
  setSelectedBooks,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(item.quantity);
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    setIsChecked(false);
  }, [item]); // Reset trạng thái của checkbox khi item thay đổi

  // UPDATE CART theo giá tiền
  useEffect(() => {
    const updateCartItem = async () => {
      try {
        await cartApi.updateCartItem(customerId, item.book._id, count);
        const updatedCart = await cartApi.getCart(customerId);
        setCart(updatedCart);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    updateCartItem();
  }, [count, customerId, item.book._id, setCart]);

  useEffect(() => {
    setIsChecked(isCheckedAll);
  }, [isCheckedAll]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const decreaseCount = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const increaseCount = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 10));
  };

  const priceSale = item.book.price - (item.book.price * item.book.sales) / 100;

  // Xóa book khỏi cart
  const handleRemoveFromCart = async () => {
    try {
      await cartApi.removeFromCart(customerId, item.book._id);
      console.log("Book removed from cart successfully!");

      const updatedCart = await cartApi.getCart(customerId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Tính tổng giá tiền các mục đã chọn
  useEffect(() => {
    if (isChecked) {
      const price = item.book.sales
        ? item.book.price - (item.book.price * item.book.sales) / 100
        : item.book.price;

      setItemTotal(price * item.quantity);
      setTotal((prevTotal) => prevTotal + price * item.quantity);

      // Thêm sách vào danh sách các cuốn sách được chọn
      setSelectedBooks((prevSelectedBooks) => [
        ...prevSelectedBooks,
        { book: item.book, quantity: item.quantity }
      ]);
    } else {
      setItemTotal(0);
      setTotal((prevTotal) => prevTotal - itemTotal);

      // Xóa sách khỏi danh sách các cuốn sách được chọn
      setSelectedBooks((prevSelectedBooks) =>
        prevSelectedBooks.filter((book) => book._id !== item.book._id)
      );
    }
  }, [isChecked]);

  return (
    <li key={item.book._id} className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-6">
        <div className="flex w-7/12 gap-6">
          <input
            className="min-w-5 h-5 rounded my-auto"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <img
            className="object-cover h-28 my-auto"
            src={item.book.image}
            alt=""
          />
          <div className="flex flex-col justify-between">
            <p className="text-sm">{item.book.name}</p>
            <p className="font-bold items-end flex gap-3">
              {`${priceSale.toLocaleString("vi-VN")} đ`}
              <span className="font-normal text-gray-500 leading-[1.6] text-sm line-through">
                {item.book.price} đ
              </span>
            </p>
          </div>
        </div>
        <div className="flex w-72 justify-between pl-3 items-center">
          <div className="flex items-center justify-between border text-gray-500 my-auto border-gray-400 w-20 p-1 h-7 rounded-md">
            <button onClick={decreaseCount}>
              <Minus size={18} />
            </button>
            <span className="text-black">{count}</span>
            <button onClick={increaseCount}>
              <Plus size={18} />
            </button>
          </div>
          <div className="font-bold text-secondary mr-1">
            {`${(priceSale * count).toLocaleString("vi-VN")} đ`}
          </div>
          <button onClick={handleRemoveFromCart}>
            <Trash2 size={22} className="text-gray-600" />
          </button>
        </div>
      </div>
      {index !== cart.items.length - 1 && (
        <>
          <hr className="h-1 border-t-2 w-full border-gray-300" />
        </>
      )}
    </li>
  );
};

export default Cart;
