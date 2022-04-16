import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const API_ORDERPRODUCTS = "/api/order_products";
const API_ORDERS = "/api/orders";
const Cart = ({ cartInfo, setCartInfo, orders }) => {
  const lsToken = localStorage.getItem("token");
  let cart;
  if (localStorage.getItem("order")) {
    cart = localStorage.getItem("order");
  }
  console.log(cart);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const id = useParams();
  const [count, setCount] = useState("");
  console.log(id);
  const order = orders.filter((order) => id.id == order.id);
  console.log(order);
  const [orderProductId, setOrderProductId] = useState("");

  const fetchCart = async () => {
    const response = await fetch(`/api/orders/${order.id}`);
    const info = await response.json();
    console.log(info);
    setCartInfo(info);
  };

  const handleProductDelete = async (id) => {
    const response = await fetch(`${API_ORDERPRODUCTS}/${orderProductId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    fetchRoutines();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ORDERS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
      body: JSON.stringify({
        count,
      }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    fetchCart();
    setError("");
  };

  useEffect(() => {
    fetchCart();
    setOrderProductId(order.orderProductId);
  }, []);
  return (
    <>
      <div>
        <div className="page-titles">
          <h1>My Cart</h1>
        </div>
        <div id="cart">
          {cartInfo.products &&
            cartInfo.products.map((product) => {
              return (
                <div key={product.id} className="product-view">
                  <h2 className="product-title">{product.title}</h2>
                  <h4 className="product-designer">"{product.designer}"</h4>
                  <h5 className="product-price">By: ${product.price}</h5>
                  <h5 className="product-count">By: {product.count}</h5>
                  <select
                    value={count}
                    onChange={(event) => {
                      setCount(event.target.value);
                    }}
                  >
                    <option value="any">Quantity</option>
                    {quantity.map((num, index) => {
                      return (
                        <>
                          <option key={num.index} value={num}>
                            {num}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <button className="products" onClick={handleSubmit}>
                    Update Quantity
                  </button>
                  <button
                    className="products"
                    value={product.orderProductId}
                    onClick={(e) => {
                      const orderProductId = e.target.value;
                      handleProductDelete(orderProductId);
                    }}
                  >
                    Delete
                  </button>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Cart;
