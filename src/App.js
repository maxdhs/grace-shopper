import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchProducts } from "./api";
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
} from "./Components";

function App() {
  const [cartIsEmpty] = useState(false);

  // const [token, setToken] = useState("");
  // const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />}>
          <Route path="mens" element={<Mens />} />

          <Route path="womens" element={<Womens />} />

          <Route path="kids" element={<Kids />} />

          <Route path="shoes" element={<Shoes />} />

          <Route path="bags" element={<Bags />} />
        </Route>

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
