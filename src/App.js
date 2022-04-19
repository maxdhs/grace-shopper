import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Navbar,
  Home,
  Products,
  Cart,
  Register,
  Login,
  Mens,
  Womens,
  Kids,
  Shoes,
  Bags,
} from './Components';

async function App() {
  const [cartIsEmpty, setCartIsEmpty] = useState(false);
  const [products, setProducts] = useState([]);

  // const [token, setToken] = useState("");
  // const [userdata, setUserdata] = useState(null);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/mens" element={<Mens />} />

        <Route
          path="/products/womens"
          element={<Womens products={products} />}
        />

        <Route path="kids" element={<Kids />} />

        <Route path="shoes" element={<Shoes />} />

        <Route path="/products/bags" element={<Bags />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/cart"
          element={cartIsEmpty ? <Navigate to="/products" /> : <Cart />}
        />
      </Routes>
    </div>
  );
}

export default App;
