import { useState } from "react";
import { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login_Register } from "./components/index";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState("");
  const [products, setProducts] = useState("");
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
