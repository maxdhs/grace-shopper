import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const info = await response.json();
    if (info.error) {
      setError(info.error);
      return;
    }
    setUser(info.user);
    localStorage.setItem("token", info.user.token);
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          required
          placeholder="Enter email.."
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          placeholder="Enter password.."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Register;
