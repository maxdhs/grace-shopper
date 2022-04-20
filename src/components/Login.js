import { useState } from "react";

import { Link } from "react-router-dom";

const API_LOGIN = "/api/users/login";
const API_UserId= "api/orders/:userId"

const Login = ({
  setToken,
  action,
  error,
  setError,
  setUserData,
  setUserId,
  setOrderInfo
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const title = "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const info = await response.json();
      console.log(info);
      setUserData(info.user);
      setUserId(info.user.id);
      if (info.error) {
        return setError(info.error);
      }
      setToken(info.token);
      localStorage.setItem("token", info.token);
      localStorage.setItem("userid", info.user.id);
      setEmail("");
      setPassword("");

      setError("You are now logged in!");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmituserId = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_UserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId
        }),
      });
      const info = await response.json();
  } catch (error) {
    throw error;
  }
};

  return (
    <>
      <h3 className="main-login">{title}</h3>
      <form className="sign-in" onSubmit={() =>{handleSubmit(); handleSubmituserId()}}>
        <input
          className="sign-in-box"
          required
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="sign-in-box"
          required
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        ></input>

        <button className="sign-in-box" type="submit">
          {title}
        </button>
        <p className="sign-in-box" id="error">
          {error}
        </p>
        <Link className="sign-in-box" to="/register">
          Click here to Register!
        </Link>
      </form>
    </>
  );
};

export default Login;
