const CatalogLeftNav = ({
  categories,
  selectedCategory,
  selectedPriceRange,
  selectedType,
  onCategoryClick,
  onTypeClick,
  onPriceRangeChange,
}) => {
  const priceRanges = [
    { id: 1, label: "0đ - 100.000đ", range: [0, 100000] },
    { id: 2, label: "100.000đ - 150.000đ", range: [100000, 150000] },
    { id: 3, label: "150.000đ - 200.000đ", range: [150000, 200000] },
    { id: 4, label: "200.000đ trở lên", range: [200000, Infinity] },
  ];

  return (
    <div className="flex flex-col ">
      <h className="font-poppins font-semibold text-sm mb-2">NHÓM SẢN PHẨM</h>
      <h1
        className="text-sm mb-2 cursor-pointer hover:text-[#bf9a61]"
        onClick={() => onCategoryClick(null)}
      >
        Thể Loại Sách
      </h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="text-sm ml-2">
            <h3
              className={`text-sm mb-2 cursor-pointer ${
                selectedCategory === category.name
                  ? "font-bold text-blue-700"
                  : "text-[#666] hover:text-[#bf9a61]"
              }`}
              onClick={() => onCategoryClick(category.name)}
            >
              {category.name}
            </h3>
            {selectedCategory === category.name && (
              <ul className={`list-none pl-3 cursor-pointer`}>
                {category.bookTypes.map((type) => (
                  <li
                    className={`mb-2 ${
                      selectedType === type.name
                        ? "font-bold text-[#F7941E]"
                        : " text-[#666] hover:text-[#bf9a61]"
                    }`}
                    onClick={() => onTypeClick(type.name)}
                    key={type.id}
                  >
                    {type.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="text-sm">
        <h3 className="text-sm mb-2 mt-4 font-semibold">Giá cả</h3>
        <ul className={`list-none pl-3 cursor-pointer`}>
          {priceRanges.map((range) => (
            <li
              key={range.id}
              className={`mb-2 ${
                selectedPriceRange && selectedPriceRange.id === range.id
                  ? "font-bold text-[#F7941E]"
                  : " text-[#666] hover:text-[#bf9a61]"
              }`}
              onClick={() => onPriceRangeChange(range)}
            >
              {range.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatalogLeftNav;
