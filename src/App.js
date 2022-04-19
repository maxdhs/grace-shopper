import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { fetchProducts } from "./api";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Register from "./components/Register";
import SingleProduct from "./components/SingleProduct";
import Women from "./components/categories/Women";
import Men from "./components/categories/Men";
import Kids from "./components/categories/Kids";
import Accessories from "./components/categories/Accessories";

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

export default App;
