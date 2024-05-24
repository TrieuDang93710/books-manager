import { useState, useEffect } from "react";
import { dropdown, menu, search } from "../assets/icons";
import vnflag from "../assets/images/vnflag.png";
import logo from "../assets/images/logo.png";
import { navLinks } from "../constants";
import { bookApi} from "../services";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";

const Navbar = ({ customerId }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await bookApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
    setIsHovered(true);
  };

  const handleSearch = (term) => {
    const results = performSearch(term);

    setSearchResults(results);
  };

  const performSearch = (term) => {
    const trimmedTerm = term.trim();
    if (trimmedTerm === "") {
      return [];
    }
    const lowerCaseTerm = trimmedTerm.toLowerCase();
    const results = categories.reduce((acc, category) => {
      category.bookTypes.forEach((bookType) => {
        bookType.books.forEach((book) => {
          if (book && book.name && typeof book.name === "string") {
            if (book.name.toLowerCase().includes(lowerCaseTerm)) {
              acc.push(book);
            }
          } else {
            console.error(
              "Đối tượng 'book' hoặc thuộc tính 'book.name' không hợp lệ:",
              book
            );
          }
        });
      });
      return acc;
    }, []);
    return results;
  };

  return (
    <header className="padding-x px-2 bg-white pt-3 max-sm:pt-1 pb-2 relative z-10 w-full max-sm:bg-secondary">
      <nav className="flex flex-col justify-start items-center max-container">
        <a href="/" className="mb-2 sm:hidden w-36">
          <img src={logo} alt="" className="max-md:h-9 max-sm:h-6 h-10" />
        </a>
        <div className="flex justify-between items-center w-full gap-2">
          <a href="/" className="mb-2 max-sm:hidden">
            <img src={logo} alt="" className="max-md:h-9 h-10" />
          </a>
          <div className="flex justify-center w-[52%] max-sm:w-full">
            <a href="/" className="flex items-center mr-3 max-sm:mr-1">
              <img src={menu} alt="" className="h-7 mr-1" />
              <img src={dropdown} alt="" className="h-3 max-sm:hidden" />
            </a>
            <div className="w-full flex gap-1 items-center max-sm:border-none border border-gray-300 py-1 rounded-md relative">
              <input
                type="text"
                placeholder="Lì xì đầu năm 20.240đ cho đơn từ 202.400đ"
                value={searchTerm}
                onFocus={handleInputFocus}
                onBlur={() => setInputFocused(false)}
                onChange={handleSearchChange}
                className="py-[2px] max-sm:py-[4px] max-sm:pl-2 pl-5 text-[15px] focus:outline-none w-full rounded-[4px]"
              />
              <span className="px-6 py-1 mr-1 cursor-pointer bg-secondary rounded-md max-sm:hidden">
                <img src={search} alt="" className="h-5 w-6" />
              </span>
              {(isInputFocused || isHovered) && (
                <ul
                  className={`absolute z-10 bg-white rounded-md shadow-md top-11 w-full `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {searchResults.map((suggestion) => (
                    <Link key={suggestion._id} to={`/books/${suggestion._id}`} >
                      <li className="cursor-pointer rounded-md p-2 hover:bg-gray-100">
                        {suggestion.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex">
            <ul className="list-none flex flex-1 justify-center items-center gap-5 max-md:gap-3 max-sm:gap-2">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer flex flex-col items-center `}
                >
                  <Link to={`${nav.id}s/${customerId}`}>
                    <span className="sm:block hidden text-[#7A7E7F] relative">
                      {nav.icon}
                      {/* {(nav.id === "cart") && (
                        <span className="bg-secondary text-[9px] flex items-center justify-center text-white rounded-full w-[18px] h-[18px] absolute -top-3 -right-3">{cartCount}</span>
                      )} */}
                    </span>
                    <img
                      src={nav.iconActive}
                      alt=""
                      className="h-8 sm:hidden"
                    />
                  </Link>

                  <Link
                    to={`${nav.id}s/${customerId}`}
                    className="text-xs max-sm:hidden"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
              <div className="flex items-center border border-gray-400 px-2 gap-1 rounded-md max-sm:hidden">
                <img src={vnflag} alt="" className="h-9" />
                <img src={dropdown} alt="" className="h-3" />
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
