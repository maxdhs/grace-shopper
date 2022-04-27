import { Link } from "react-router-dom";
import { useState } from "react";

const API_ORDERPRODUCTS = "/api/order_products";
const API_ORDERS = "/api/orders";
const Cart = ({
  fetchOrderProducts,
  orderProducts,
  products,
  count,
  setCount,
  setError,
}) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const lsOrderId = localStorage.getItem("orderId");
  const orderProduct = orderProducts.filter(
    (product) => lsOrderId == product.orderId
  );

  const lsToken = localStorage.getItem("token");
  const productArr = [];
  const productQuantity = [];
  for (let i = 0; i < orderProduct.length; i++) {
    const productId = orderProduct[i].productId;
    productArr.push(productId);
    productQuantity.push(orderProduct[i].count);
  }
  const [message, setMessage] = useState("");

  let finalProducts = [];
  let finalProductQuantity = [];
  for (let j = 0; j < productArr.length; j++) {
    let product = productArr[j];

    for (let l = 0; l < products.length; l++) {
      let product1 = products[l];

      if (product === product1.id) {
        finalProducts.push(product1);
        finalProductQuantity.push(productQuantity[j]);
      }
    }
  }

  let finalProductsAdd = [];
  for (let i = 0; i < finalProducts.length; i++) {
    for (let j = 0; j < finalProductQuantity.length; j++) {
      finalProductsAdd.push({
        ...finalProducts[i],
        quantity: finalProductQuantity[j],
      });
    }
  }

  const handleProductDelete = async (id) => {
    let product;
    for (let i = 0; i < orderProduct.length; i++) {
      if (id == orderProduct[i].productId) {
        product = orderProduct[i];
      }
    }
    const response = await fetch(`${API_ORDERPRODUCTS}/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
    });
    const info = await response.json();
    setMessage("");
    if (info.error) {
      return setError(info.error);
    }
    fetchOrderProducts();
  };

  const handleSubmit = async (id) => {
    let product;
    for (let i = 0; i < orderProduct.length; i++) {
      if (id == orderProduct[i].productId) {
        product = orderProduct[i];
      }
    }
    const response = await fetch(`${API_ORDERPRODUCTS}/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count,
      }),
    });
    const info = await response.json();
    setMessage("Quantity Updated!");
    if (info.error) {
      return setError(info.error);
    }
    setError("");
  };

  const handleSubmitOrder = async (id) => {
    const orderProductId = orderProduct[0].orderId;

    const response = await fetch(`${API_ORDERS}/${orderProductId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderProductId,
      }),
    });
    const info = await response.json();
    setMessage("");
    if (info.error) {
      return setError(info.error);
    }
    setError("");
  };

  return (
    <>
      <div>
        <div className="page-titles">
          <h1>My Cart</h1>
        </div>
        <div id="cart">
          {finalProducts
            ? finalProducts.map((product, index) => {
                return (
                  <>
                    <div key={product.id} className="product-view">
                      <h2 className="product-title">{product.title}</h2>
                      <img
                        className="product-text"
                        id="image"
                        src={product.image}
                      />
                      <h4 className="product-designer">{product.designer}</h4>
                      <h5 className="product-price">${product.price}</h5>
                      <select
                        onChange={(event) => {
                          finalProductQuantity[index] = event.target.value;
                          setCount(event.target.value);
                        }}
                      >
                        <option value="original quantity">
                          {finalProductQuantity[index]}
                        </option>
                        {quantity.map((num) => {
                          return (
                            <>
                              <option key={num} value={num}>
                                {num}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      <button
                        value={product.id}
                        onClick={(e) => {
                          const orderProductId = e.target.value;
                          handleSubmit(orderProductId);
                        }}
                        className="productsbutton"
                      >
                        Submit
                      </button>
                      <button
                        className="productsbutton"
                        value={product.id}
                        onClick={(e) => {
                          const orderProductId = e.target.value;
                          handleProductDelete(orderProductId);
                        }}
                      >
                        Delete
                      </button>
                      <br />
                    </div>
                  </>
                );
              })
            : null}
        </div>
        <p class="message">{message}</p>
        <div>
          <button id="cart-button" onClick={handleSubmitOrder}>
            {finalProducts.length ? (
              <Link to="/purchased">Submit Order</Link>
            ) : null}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
