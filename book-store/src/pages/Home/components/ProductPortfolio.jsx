import { useState, useEffect } from "react";
import { bookApi } from '../../../services';
import CatalogLeftNav from "../../../components/CatalogLeftNav";
import { Link } from 'react-router-dom';

const ProductPortfolio = () => {
  const [categories, setCategories] = useState([]);  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await bookApi.getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); 

  console.log(categories);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedType(null);
    setSelectedPriceRange(null);
  };

  const handleTypeClick = (typeName) => {
    setSelectedType(typeName);
    setSelectedPriceRange(null);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };

  return (
    <div className="sm:flex-row flex flex-col max-sm:items-center gap-5 ">
      <div className="w-[30%] max-sm:w-[40%] p-3 bg-white">
        <CatalogLeftNav
          categories={categories}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          selectedPriceRange={selectedPriceRange}
          onCategoryClick={handleCategoryClick}
          onTypeClick={handleTypeClick}
          onPriceRangeChange={handlePriceRangeChange}
        />
      </div>
      <div className="flex w-full bg-white justify-center items-center">
        <div className="grid grid-cols-4 mt-4 p-4">
          {categories.map((category) =>
            category.bookTypes.map(
              (type) =>
                (!selectedCategory || selectedCategory === category.name) &&
                (!selectedType || selectedType === type.name) &&
                type.books.map((book) => {
                  const isInPriceRange =
                    !selectedPriceRange ||
                    (book.price - (book.price * book.sales) / 100 >=
                      selectedPriceRange.range[0] &&
                      book.price - (book.price * book.sales) / 100 <=
                        selectedPriceRange.range[1]);

                  return isInPriceRange ? (
                    <Link to={`/books/${book._id}`}>
                      <div key={book._id} className="bg-white flex flex-col items-start p-2 pb-4 cursor-pointer hover:custom-shadow hover:z-50 relative">
                        <div className="h-[250px] w-full">
                          <img src={book.image} alt={book.name} className="object-cover h-48 w-full" />
                          <p className="text-sm mt-1 line-clamp-2 text-ellipsis overflow-hidden">{book.name}</p>
                        </div>
                        <div className="flex gap-2 text-secondary my-1 font-bold">
                          <p>{`${(
                            book.price -
                            (book.price * book.sales) / 100
                          ).toLocaleString("vi-VN")} đ`}</p>
                          <div className="absolute top-0 right-0 bg-orange-500 text-white text-base font-bold rounded-full h-12 w-12 flex justify-center items-center m-2">{`-${book.sales}%`}</div>
                        </div>
                        <div className="text-gray-500 text-sm line-through">
                          {book.price.toLocaleString("vi-VN")}
                        </div>
                      </div>
                    </Link>
                  ) : null;
                })
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPortfolio;
