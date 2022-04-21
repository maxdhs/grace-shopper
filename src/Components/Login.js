import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, userInfo } from '../api';

const Login = ({ setToken, setUserdata }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const info = await login(username, password);
      if (info.error) {
        return setError(info.error);
      }

      setToken(info.token);
      localStorage.setItem('token', info.token);
      const infoU = await userInfo(info.token);
      setUserdata(infoU.data);
      history('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-grp">
          <label>Name</label>
          <input
            required
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>

        <div className="login-form-grp">
          <label>Password</label>
          <input
            required
            text="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <button type="submit"> Log In</button>
      </form>

      <div className="goto-register ">
        <Link to="/register">
          Don't have an account? Click here to register
        </Link>
      </div>

      {error && <div> {error}!</div>}
    </>
  );
};
export default Login;
