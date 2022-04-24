import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { fetchProducts, fetchUser} from './api';
import { createCart } from './api';
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
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchUser().then(user => {
      console.log(user, "user")
      if(user) {
        setUserInfo(user)
      }
    });
    createCart();
    fetchProducts().then((product) => {
      setProducts(product);
    });
  }, []);
  console.log(userInfo);
  return (
    <>
      <Navbar 
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/products" 
          element={
            <Products 
              products={products} 
            />
          } 
        />
        <Route
          path="/categories/women"
          element={
            <Women 
              products={products} 
            />
          }
        />
        <Route 
          path="/categories/men" 
          element={
            <Men 
              products={products} 
          />
          } 
        />
        <Route 
          path="/categories/kids" 
          element={
            <Kids 
              products={products} 
            />
          } 
        />
        <Route
          path="/categories/accessories"
          element={
            <Accessories 
              products={products} 
            />
          }
        />
        <Route 
          path="products/:id" 
          element={
            <SingleProduct />
          } 
        />
        <Route
          path="/login"
          element={
            <Login 
              setUserInfo={setUserInfo}
            />
            }
        />
        <Route 
          path="/register" 
          element={
            <Register />
          } 
        />
        <Route 
          path="/cart" 
          element={<Cart />} 
        />
      </Routes>
      <NotificationContainer />
    </>
  );
};

export default App;
