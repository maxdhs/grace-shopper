import { useState } from "react";
import { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  AllShoes,
  Navbar,
  SingleShoe,
  Cart,
  Home,
  Boots,
  Heels,
  Sandals,
  Sneakers,
} from "./components/index";

const API_USER = "/api/users/me";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  // const [order, setOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [cartInfo, setCartInfo] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);

  // const fetchUser = async () => {
  //   const lsToken = localStorage.getItem("token");
  //   console.log(lsToken);
  //   if (lsToken) {
  //     setToken(lsToken);
  //     try {
  //       const response = await fetch(`${API_USER}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${lsToken}`,
  //         },
  //       });
  //       const info = await response.json();
  //       console.log(info);
  //       setUserData(info);
  //       setEmail(info.email);
  //       setUserId(info.id);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // };

  async function createNewOrder() {
    const lsOrderId = localStorage.getItem("orderId");
    const lsOrderUserId = localStorage.getItem("orderUserId");
    const lsOrderIsPurchased = localStorage.getItem("orderIsPurchased");
    if (!userId) {
      userId === null;
    }
    if (lsOrderId) {
      setOrderInfo({
        id: lsOrderId,
        userId: lsOrderUserId,
        isPurchased: lsOrderIsPurchased,
      });
      return;
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
    });
    const info = await response.json();
    setOrderInfo(info);
    localStorage.setItem("orderId", info.id);
    localStorage.setItem(
      "orderUserId",

      info.userId
    );
    localStorage.setItem("orderIsPurchased", info.isPurchased);
  }

  async function fetchProducts() {
    const response = await fetch("/api/products", {});
    const info = await response.json();
    setProducts(info.products);
  }

  async function fetchOrders() {
    const response = await fetch("/api/orders");
    const info = await response.json();
    setOrders(info.orders);
  }

  useEffect(() => {
    fetchProducts();
    // fetchUser();
    fetchOrders();
    createNewOrder();
  }, [token]);
  // console.log(products);
  return (
    <>
      <div id="main-section">
        <BrowserRouter>
          <div id="links">
            <Navbar
              userData={userData}
              setUserData={setUserData}
              token={token}
              setToken={setToken}
            />
          </div>

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/register"
              element={
                <Register
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
                <Login
                  action="login"
                  setToken={setToken}
                  error={error}
                  setError={setError}
                  setUserData={setUserData}
                  setUserId={setUserId}
                />
              }
            />
            <Route
              exact
              path="/all-shoes"
              element={
                <AllShoes products={products} fetchProducts={fetchProducts} />
              }
            />
            <Route
              exact
              path="/:shoeId"
              element={
                <SingleShoe
                  orderInfo={orderInfo}
                  products={products}
                  fetchProducts={fetchProducts}
                  // fetchUser={fetchUser}
                  userId={userId}
                  cartInfo={cartInfo}
                  setCartInfo={setCartInfo}
                />
              }
            />
            <Route
              exact
              path="/cart/:orderId"
              element={
                <Cart
                  cartInfo={cartInfo}
                  setCartInfo={setCartInfo}
                  orders={orders}
                  orderInfo={orderInfo}
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
