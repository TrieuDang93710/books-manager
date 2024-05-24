import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Payment from "./pages/Payment";

const customerId = "65ab834fa0b74924cde39bb1"

const App = () => (
  <div>
    <Router>
    <Navbar customerId={customerId} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:bookId" element={<BookDetail customerId={customerId}/>} />
        <Route path="/carts/:customerId" element={<Cart customerId={customerId}/>} />
        <Route path="/payment/:customerId" element={<Payment customerId={customerId}/>} />
      </Routes>
    </Router>
  </div>
);

export default App;
