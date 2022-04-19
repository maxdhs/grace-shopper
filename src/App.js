import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { fetchProducts } from './api';
import Cart from './Components/Cart';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Register from './Components/Register';
import SingleProduct from './Components/SingleProduct';
import Women from './Components/categories/Women';
import Men from './Components/categories/Men';
import Kids from './Components/categories/Kids';
import Accessories from './Components/categories/Accessories';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((product) => {
      setProducts(product);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route
          path="/categories/women"
          element={<Women products={products} />}
        />
        <Route path="/categories/men" element={<Men products={products} />} />
        <Route path="/categories/kids" element={<Kids products={products} />} />
        <Route
          path="/categories/accessories"
          element={<Accessories products={products} />}
        />
        <Route path="products/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
