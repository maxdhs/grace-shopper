import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  return (
    <>
      
    </>
  );
};
export default Cart;
