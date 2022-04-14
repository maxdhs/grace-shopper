import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  return (
    <>
      <h2>Login</h2>
    </>
  );
};
export default Login;
