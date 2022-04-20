import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const API_ORDERPRODUCTS = "/api/order_products";
const API_ORDERS = "/api/orders";
const Cart = ({
  cartInfo,
  setCartInfo,
  orders,
  orderInfo,
  fetchOrderProducts,
  orderProducts,
  products,
  count,
  setCount,
  setError,
}) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(count);
  const [orderProductId, setOrderProductId] = useState("");
  const lsOrderId = localStorage.getItem("orderId");
  const orderProduct = orderProducts.filter(
    (product) => lsOrderId == product.orderId
  );
  console.log(orderProduct);
  const lsToken = localStorage.getItem("token");
  const productArr = [];
  const productQuantity = [];
  for (let i = 0; i < orderProduct.length; i++) {
    const productId = orderProduct[i].productId;
    productArr.push(productId);
    productQuantity.push(orderProduct[i].count);
  }
  //   console.log(productArr);
  console.log(productQuantity);

  let finalProducts = [];
  let finalProductQuantity = [];
  for (let j = 0; j < productArr.length; j++) {
    let product = productArr[j];
    // console.log(product);
    for (let l = 0; l < products.length; l++) {
      let product1 = products[l];
      //   console.log(product1);
      if (product === product1.id) {
        finalProducts.push(product1);
        finalProductQuantity.push(productQuantity[j]);
      }
    }
    console.log(finalProducts);
    console.log(finalProductQuantity);
  }

  let finalProductsAdd = [];
  for (let i = 0; i < finalProducts.length; i++) {
    console.log(finalProducts[i]);
    for (let j = 0; j < finalProductQuantity.length; j++) {
      finalProductsAdd.push({
        ...finalProducts[i],
        quantity: finalProductQuantity[j],
      });
    }
  }

  console.log(finalProductsAdd);

  //   console.log(orderProduct);

  //   const fetchCart = async () => {
  //     try {
  //       const response = await fetch(`/api/orders/${lsOrderId}`);
  //       const info = await response.json();
  //       console.log(info);
  //       setCartInfo(info);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  const handleProductDelete = async (id) => {
    let product;
    for (let i = 0; i < orderProduct.length; i++) {
      console.log(orderProduct[i].productId);
      console.log(id);
      if (id == orderProduct[i].productId) {
        product = orderProduct[i];
      }
    }
    console.log(product);
    // console.log(id);
    const response = await fetch(`${API_ORDERPRODUCTS}/${product.id}`, {
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
    fetchOrderProducts();
  };

  const handleSubmit = async (id) => {
    let product;
    for (let i = 0; i < orderProduct.length; i++) {
      console.log(orderProduct[i].productId);
      console.log(id);
      if (id == orderProduct[i].productId) {
        product = orderProduct[i];
      }
    }
    console.log(product);
    const response = await fetch(`${API_ORDERPRODUCTS}/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${lsToken}`,
      },
      body: JSON.stringify({
        count,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
    setError("");
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ORDERS}/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();
  };

  useEffect(() => {
    // fetchCart();
    fetchOrderProducts();
    setOrderProductId(orderProduct.id);
  }, []);

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
                      {/* <p>{product.count}</p> */}
                      <select
                        value={count}
                        onChange={(event) => {
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
                      {/* <form onSubmit={handleSubmit}>
                        <input placeholder={product.count}></input> */}
                      <button
                        value={product.id}
                        onClick={(e) => {
                          const orderProductId = e.target.value;
                          handleSubmit(orderProductId);
                        }}
                        className="products"
                      >
                        Update Quantity
                      </button>
                      {/* </form> */}

                      <button
                        className="products"
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
        {finalProducts.length ? (
          <button onClick={handleSubmitOrder}>Submit Order</button>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
