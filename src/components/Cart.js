import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Cart = ({ cartInfo, setCartInfo, orders }) => {
  let cart;
  if (localStorage.getItem("order")) {
    cart = localStorage.getItem("order");
  }
  console.log(cart);
  const id = useParams();
  console.log(id);
  const order = orders.filter((order) => id.id == order.id);
  console.log(order);
  const fetchCart = async () => {
    const response = await fetch(`/api/orders/${order.id}`);
    const info = await response.json();
    console.log(info);
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return <></>;
};

export default Cart;
