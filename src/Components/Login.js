import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser, login } from '../api';

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
