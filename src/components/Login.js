import { useState } from "react";

import { Link } from "react-router-dom";

const API_LOGIN = "/api/users/login";

const Login = ({
  setToken,
  error,
  setError,
  setUserData,
  setUserId,
  checkUser,
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
      setUserData(info.user);
      setUserId(info.user.id);
      console.log(info);
      if (info.error) {
        return setError(info.error);
      }
      setToken(info.token);
      localStorage.setItem("token", info.token);
      localStorage.setItem("userId", info.user.id);
      setEmail("");
      setPassword("");
      checkUser();
      setError("You are now logged in!");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h3 className="main-login">{title}</h3>
      <form className="sign-in" onSubmit={handleSubmit}>
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
