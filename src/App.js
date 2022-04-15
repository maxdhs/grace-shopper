import { useState } from "react";
import { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login_Register,
  Boots,
  Heels,
  Sandals,
  Sneakers,
} from "./components/index";
// import Boots from "./components/Boots";

const API_USER = "/api/users/me";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
      try {
        const response = await fetch(`${API_USER}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lsToken}`,
          },
        });
        const info = await response.json();
        setUserData(info);
        setEmail(info.email);
      } catch (error) {
        throw error;
      }
    }
  };

  async function fetchProducts() {
    const response = await fetch("/api/products");
    const info = await response.json();
    setProducts(info.products);
  }
  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, [token]);
  // console.log(products);
  return (
    <>
      <div id="main-head">
        <h1>Sick Kicks</h1>
      </div>
      <div id="navbar-title">
        <div id="links">
          {/* <Navbar
            userData={userData}
            setUserData={setUserData}
            token={token}
            setToken={setToken}
          /> */}
        </div>
      </div>
      <div id="main-section">
        <BrowserRouter>
          <Routes>
            {/* <Route exact path="/" element={<Home userData={userData} />} /> */}
            <Route
              exact
              path="/register"
              element={
                <Login_Register
                  token={token}
                  action="register"
                  setToken={setToken}
                  error={error}
                  setError={setError}
                  setUserData={setUserData}
                />
              }
            />
            <Route
              exact
              path="/login"
              element={
                <Login_Register
                  action="login"
                  setToken={setToken}
                  error={error}
                  setError={setError}
                  setUserData={setUserData}
                />
              }
            />
            {/* <Route exact path="/" element={<Home />} /> */}
            {/* <Route exact path="/allshoes" element={<AllShoes />} /> */}
            <Route
              exact
              path="/boots/*"
              element={<Boots products={products} setProducts={setProducts} />}
            />
            <Route
              exact
              path="/heels"
              element={<Heels products={products} setProducts={setProducts} />}
            />
            <Route
              exact
              path="/sandals"
              element={
                <Sandals products={products} setProducts={setProducts} />
              }
            />
            <Route
              exact
              path="/sneakers"
              element={
                <Sneakers products={products} setProducts={setProducts} />
              }
            />
            {/* <Route exact path="/cart" element={<Cart />} /> */}
            {/* <Route exact path="/admin" element={<Admin />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
