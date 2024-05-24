import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { paymentMethods, countries } from ".././constants/index";
import { orderApi } from ".././services/index";

const Payment = () => {
  const location = useLocation();
  const { selectedBooks, total, customerId } = location.state;
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
    province: "",
    district: "",
    ward: "",
    detail: "",
  });

  console.log(selectedBooks);

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleInputChange = (field, value) => {
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }

    try {
      // Tạo đơn hàng mới
      const orderData = {
        customerId: customerId, // Thay bằng customerId thực tế
        items: selectedBooks.map((selectedBook) => ({
          book: selectedBook.book._id,
          quantity: selectedBook.quantity,
          price: selectedBook.book.price,
        })),
        total,
        status: "Pending",
        paymentMethod,
        shippingAddress,
      };

      const createdOrder = await orderApi.createOrder(orderData);

      // Sau khi tạo đơn hàng thành công, bạn có thể chuyển người dùng đến trang xác nhận đơn hàng hoặc thực hiện các bước khác
      console.log("Created Order:", createdOrder);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    // Lấy danh sách các tỉnh/thành phố của quốc gia được chọn
    const selectedCountryInfo = countries.find(
      (country) => country.name === selectedCountry
    );
    const provinces = selectedCountryInfo ? selectedCountryInfo.provinces : [];

    // Cập nhật danh sách tỉnh/thành phố vào state
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      province: "", // Reset tỉnh/thành phố khi thay đổi quốc gia
      district: "", // Reset quận khi thay đổi tỉnh/thành phố
      ward: "", // Reset phường khi thay đổi quận
    }));
  };

  const handleProvinceChange = (selectedProvince) => {
    // Lấy danh sách các quận của tỉnh/thành phố được chọn
    const selectedProvinceInfo = countries
      .find((country) => country.name === shippingAddress.country)
      .provinces.find((province) => province.name === selectedProvince);
    const districts = selectedProvinceInfo
      ? selectedProvinceInfo.districts
      : [];

    // Cập nhật danh sách quận vào state
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      district: "", // Reset quận khi thay đổi tỉnh/thành phố
      ward: "", // Reset phường khi thay đổi quận
    }));
  };

  const handleDistrictChange = (selectedDistrict) => {
    // Lấy danh sách các phường/bản của quận được chọn
    const selectedDistrictInfo = countries
      .find((country) => country.name === shippingAddress.country)
      .provinces.find((province) => province.name === shippingAddress.province)
      .districts.find((district) => district.name === selectedDistrict);
    const wards = selectedDistrictInfo ? selectedDistrictInfo.wards : [];

    // Cập nhật danh sách phường/bản vào state
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      ward: "", // Reset phường khi thay đổi quận
    }));
  };

  return (
    <>
      <div className="padding-x pt-6 pb-32 bg-primary">
        <div className="bg-white p-4">
          <h1 className=" text-base font-semibold">ĐỊA CHỈ GIAO HÀNG</h1>
          <hr className="h-1 border-t-1 w-full border-gray-300 my-2 mb-3" />
          <form className="w-1/2">
            <label className="custom-label">
              Họ và tên người nhận
              <input
                className="custom-input px-4 focus:outline-none"
                placeholder="Nhập họ và tên người nhận"
                type="text"
                value={shippingAddress.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </label>
            <br />

            <label className="custom-label">
              Số Điện Thoại:
              <input
                className="custom-input px-4 focus:outline-none"
                placeholder="Ví dụ: 097849123xxx (10 ký tự số)"
                type="text"
                value={shippingAddress.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </label>
            <br />

            <label className="custom-label">
              Quốc Gia:
              <select
                className="custom-input px-3"
                value={shippingAddress.country}
                onChange={(e) => {
                  handleInputChange("country", e.target.value);
                  handleCountryChange(e.target.value);
                }}
              >
                <option value="">Chọn Quốc Gia</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
            <br />

            <label className="custom-label">
              Tỉnh/Thành Phố:
              <select
                className="custom-input px-3"
                value={shippingAddress.province}
                onChange={(e) => {
                  handleInputChange("province", e.target.value);
                  handleProvinceChange(e.target.value);
                }}
              >
                <option value="">Chọn Tỉnh/Thành Phố</option>
                {shippingAddress.country &&
                  countries
                    .find((country) => country.name === shippingAddress.country)
                    .provinces.map((province) => (
                      <option key={province.name} value={province.name}>
                        {province.name}
                      </option>
                    ))}
              </select>
            </label>
            <br />

            <label className="custom-label">
              Quận/Huyện:
              <select
                className="custom-input px-3"
                value={shippingAddress.district}
                onChange={(e) => {
                  handleInputChange("district", e.target.value);
                  handleDistrictChange(e.target.value);
                }}
              >
                <option value="">Chọn Quận/Huyện</option>
                {shippingAddress.province &&
                  countries
                    .find((country) => country.name === shippingAddress.country)
                    .provinces.find(
                      (province) => province.name === shippingAddress.province
                    )
                    .districts.map((district) => (
                      <option key={district.name} value={district.name}>
                        {district.name}
                      </option>
                    ))}
              </select>
            </label>
            <br />

            <label className="custom-label">
              Phường/Xã:
              <select
                className="custom-input px-3"
                value={shippingAddress.ward}
                onChange={(e) => handleInputChange("ward", e.target.value)}
              >
                <option value="">Chọn Phường/Xã</option>
                {shippingAddress.district &&
                  countries
                    .find((country) => country.name === shippingAddress.country)
                    .provinces.find(
                      (province) => province.name === shippingAddress.province
                    )
                    .districts.find(
                      (district) => district.name === shippingAddress.district
                    )
                    .wards.map((ward) => (
                      <option key={ward} value={ward}>
                        {ward}
                      </option>
                    ))}
              </select>
            </label>
            <br />

            <label className="custom-label">
              Địa Chỉ Nhận Hàng:
              <input
                className="custom-input px-4 focus:outline-none"
                placeholder="Nhập địa chỉ hàng"
                type="text"
                value={shippingAddress.detail}
                onChange={(e) => handleInputChange("detail", e.target.value)}
              />
            </label>
            <br />
          </form>
        </div>
        <div className="bg-white p-4 my-4">
          <h1 className="text-base font-semibold">PHƯƠNG THỨC THANH TOÁN</h1>
          <hr className="h-1 border-t-1 w-full border-gray-300 mt-2" />
          <form className="p-4">
            <fieldset className="flex flex-col gap-4">
              {paymentMethods.map((method) => (
                <label className="flex items-center gap-3" key={method.value}>
                  <input
                    type="radio"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                  />
                  <img src={method.image} alt="" />
                  {method.label}
                </label>
              ))}
            </fieldset>
          </form>
        </div>

        <div className="bg-white p-4 mt-4">
          <h1 className="text-base font-semibold">KIỂM TRA LẠI ĐƠN HÀNG</h1>
          <hr className="h-1 border-t-1 w-full border-gray-300 mt-2" />
          <div className="flex flex-col">
            {selectedBooks &&
              selectedBooks.map((selectedBook, index) => (
                <div key={index} className="flex my-3 justify-between">
                  <div className="flex w-2/3">
                    <img
                      className="object-cover h-36 my-auto"
                      src={selectedBook.book.image}
                      alt=""
                    />
                    <p>{selectedBook.book.name}</p>
                  </div>
                  <div className="w-1/3 text-sm flex justify-between">
                    <div className="flex flex-col">
                      {`${(
                        selectedBook.book.price -
                        (selectedBook.book.price * selectedBook.book.sales) /
                          100
                      ).toLocaleString("vi-VN")} đ`}

                      <p className="font-normal text-gray-500 line-through">
                        {selectedBook.book.price} đ
                      </p>
                    </div>
                    <div>{selectedBook.quantity}</div>
                    <div className="font-bold text-[#f39801]">
                      {`${(
                        selectedBook.book.price -
                        (selectedBook.book.price * selectedBook.book.sales) /
                          100
                      ).toLocaleString("vi-VN")} đ`}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-white custom-shadow fixed bottom-0 pt-3 pb-4 items-center w-full padding-x flex flex-col">
        <hr className="h-1 border-t-1 w-full my-2 border-gray-300" />
        <div className="flex justify-between w-full mt-1 items-center">
          <div className="flex items-center text-sm gap-2">
            <input
              className="w-4 h-4"
              type="checkbox"
              // checked={isCheckedAll}
              // onChange={handleCheckboxChange}
            />
            <div className="flex flex-col">
              <p className="text-[#888]">
                Bằng việc tiến hành Mua hàng, Bạn đã đồng ý với
              </p>
              <p className="text-[#2498f7] font-semibold">
                Điều khoản & Điều kiện của Fahasa.com
              </p>
            </div>
          </div>
          <button
            type="button"
            className="py-2 px-10 font-bold text-white rounded-lg text-xl bg-secondary"
            onClick={handleSubmit}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
