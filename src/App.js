import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import Cart from "./Cart";
import EditProduct from "./EditProduct";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Product from "./Product";
import Products from "./Products";
import Register from "./Register";
import Users from "./Users";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const { products } = await response.json();
    setProducts(products);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    let localUser = localStorage.getItem("localUser");
    if (!localUser) {
      localStorage.setItem(
        "localUser",
        JSON.stringify({
          orders: [],
          cart: { products: [] },
        })
      );
    }
    if (!token) {
      setUser(JSON.parse(localUser));
      return;
    }
    const response = await fetch("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const info = await response.json();
    setUser({ ...info.user, token });
  };

  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products/categories/:category"
          element={<Products products={products} />}
        />
        <Route
          path="/cart"
          element={<Cart user={user} fetchUser={fetchUser} setUser={setUser} />}
        />
        <Route
          path="/products/:productId"
          element={
            <Product
              setUser={setUser}
              products={products}
              user={user}
              fetchUser={fetchUser}
            />
          }
        />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/admin/products"
          element={
            <AdminProducts
              products={products}
              user={user}
              fetchProducts={fetchProducts}
            />
          }
        />
        <Route path="/admin/users" element={<Users user={user} />} />
        <Route
          path="/admin/products/:productId"
          element={
            <EditProduct
              products={products}
              user={user}
              fetchProducts={fetchProducts}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
