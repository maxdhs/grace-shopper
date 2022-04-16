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
}) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(count);
  const [orderProductId, setOrderProductId] = useState("");
  const lsOrderId = localStorage.getItem("orderId");
  //   console.log(lsOrderId);
  //   console.log(orderProducts);
  const orderProduct = orderProducts.filter(
    (product) => lsOrderId == product.orderId
  );

  const productArr = [];
  for (let i = 0; i < orderProduct.length; i++) {
    const productId = orderProduct[i].productId;
    productArr.push(productId);
  }
  //   console.log(productArr);
  //   console.log(products);

  let finalProducts = [];
  for (let j = 0; j < productArr.length; j++) {
    let product = productArr[j];
    // console.log(product);
    for (let l = 0; l < products.length; l++) {
      let product1 = products[l];
      //   console.log(product1);
      if (product === product1.id) {
        finalProducts.push(product1);
      }
    }
    // console.log(finalProducts);
  }

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

  //   const handleProductDelete = async (id) => {
  //     const response = await fetch(`${API_ORDERPRODUCTS}/${orderProductId}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${lsToken}`,
  //       },
  //     });
  //     const info = await response.json();
  //     if (info.error) {
  //       return setError(info.error);
  //     }
  //     fetchRoutines();
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const response = await fetch(`${API_ORDERS}/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${lsToken}`,
  //       },
  //       body: JSON.stringify({
  //         count,
  //       }),
  //     });
  //     const info = await response.json();
  //     if (info.error) {
  //       return setError(info.error);
  //     }
  //     fetchCart();
  //     setError("");
  //   };

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
            ? finalProducts.map((product) => {
                return (
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
                      value={count}
                      onChange={(event) => {
                        setCount(event.target.value);
                      }}
                    >
                      <option value="any">{count}</option>
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
                    {/* <button className="products" onClick={handleSubmit}>
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
                    </button> */}
                    <br />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Cart;
