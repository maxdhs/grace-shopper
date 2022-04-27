import { useState } from "react";

import { Link } from "react-router-dom";

const API_LOGIN = "/api/users/login";
const API_REGISTER = "/api/users/register";

const Register = ({ setToken, action, error, setError, setAllUsers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin && password !== confirm) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await fetch(`${API_REGISTER}`, {
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
        setAllUsers(info.user);
        if (info.error) {
          return setError(info.error);
        }
        setToken(info.token);
        localStorage.setItem("token", info.token);
        setEmail("");
        setPassword("");
        setConfirm("");
        setError("Thank you for registering!");
      } catch (error) {
        throw error;
      }
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
        {!isLogin ? (
          <input
            className="sign-in-box"
            required
            value={confirm}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              e.preventDefault();
              setConfirm(e.target.value);
            }}
          ></input>
        ) : null}
        <button className="sign-in-box" type="submit">
          {title}
        </button>
        <p className="sign-in-box" id="error">
          {error}
        </p>
        <Link className="sign-in-box" to="/login">
          Click here to Login!
        </Link>
      </form>
    </>
  );
};

export default Register;
