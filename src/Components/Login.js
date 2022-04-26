import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser, login } from '../api';

import "./css/Login.css";

const Login = ({setUserInfo}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = await login(username, password);
      if (info.error) {
        return setError(info.error);
      };
      if(info) {
        history('/');
        fetchUser()
          .then(user => {
            setUserInfo(user);
          });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="login_container">
      <div className="login_main">
        <form onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <label>Username:</label>
          <input
            required
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label>Password:</label>
          <input
            required
            text="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit"> Log In</button>
          <p>Don't have an account?  
            <Link to="/register">
              Register
            </Link>
          </p>
        </form>
        {error && <p> {error}!</p>}
      </div>
    </div>
  );
};
export default Login;
