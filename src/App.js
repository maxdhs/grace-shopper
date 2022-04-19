<<<<<<< HEAD
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
=======
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { fetchProducts } from "./api";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Register from "./Components/Register";
import SingleProduct from "./Components/SingleProduct";
import Women from "./Components/categories/Women";
import Men from "./Components/categories/Men";
import Kids from "./Components/categories/Kids";
import Accessories from "./Components/categories/Accessories";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(product => {setProducts(product)});
  }, []);

  return <>
    <Navbar/>
    <Routes>
      <Route 
        path="/" 
        element={<Home/>} 
      />
      <Route
        path="/products"
        element={<Products
          products={products}
        />}
      />
      <Route
            path="/categories/women"
            element={<Women
              products={products}
            />}
      />
      <Route
          path="/categories/men"
          element={<Men
            products={products}
          />}
      />
      <Route
          path="/categories/kids"
          element={<Kids
            products={products}
          />}
      />
      <Route
          path="/categories/accessories"
          element={<Accessories
            products={products}
          />}
      />
      <Route
        path="products/:id"
        element={<SingleProduct/>}
      />
      <Route
        path="/login"
        element={<Login/>}
      />
      <Route
        path="/register"
        element={<Register/>}
      />
      <Route
        path="/cart"
        element={<Cart/>}
      />
    </Routes>
  </>;
};
>>>>>>> 804d18e96e0367dbb5b5def013a18f3e49e5c173

export default App;
