import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const API_ORDERS = "/api/orders";

const SingleShoe = ({
  products,
  fetchProducts,
  cartInfo,
  setCartInfo,
  userId,
  orderInfo,
}) => {
  const id = useParams();
  const [count, setCount] = useState("");
  const shoe = products.filter((product) => id.shoeId == product.id);
  console.log(shoe);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [orderProductId, setOrderProductId] = useState("");
  console.log(orderInfo);

  const [product, setProduct] = useState("any");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetchProducts();
    setProduct(shoe[0]);
    setProductId(shoe[0].id);
  }, []);

  if (!userId) {
    userId === null;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(productId);
    console.log(count, product);

    const response = await fetch(`${API_ORDERS}/${orderInfo.id}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        count,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
    fetchProducts;
  };

  //   const handleClick = async () => {
  //     try {
  //       const lsOrder = localStorage.getItem("order");
  //       console.log(cartInfo.id);
  //       if (lsOrder) {
  //         const response = await fetch(`/api/orders/${cartInfo.id}/products`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             orderId: cartInfo.id,
  //             productId: id.shoeId,
  //             isPurchased: false,
  //           }),
  //         });
  //         const info = await response.json();
  //         console.log(info);
  //         setCartInfo([...cartInfo, info]);
  //         localStorage.setItem("order", cartInfo);
  //       } else {
  //         const response = await fetch(`${API_URL}`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             userId,
  //             productId: id.shoeId,
  //             isPurchased: false,
  //           }),
  //         });
  //         const info = await response.json();
  //         console.log(info);
  //         setCartInfo(info);
  //         localStorage.setItem("order", info);
  //       }
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  console.log(cartInfo);

  return (
    <div key={shoe[0].id} className="singleView">
      <h2 className="single-text">{shoe[0].title}</h2>
      <img className="single-text" id="image" src={shoe[0].image} />
      <h4 className="single-text">{shoe[0].designer}</h4>
      <h4 className="single-text">{shoe[0].description}</h4>
      <h4 className="single-text">${shoe[0].price}</h4>
      <h4 className="single-text">Inventory: {shoe[0].count}</h4>
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
      <button id="add-button" onClick={handleClick} className="single-text">
        Add To Cart
      </button>
    </div>
  );
};

export default SingleShoe;
