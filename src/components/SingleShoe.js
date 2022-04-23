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
  fetchOrderProducts,
}) => {
  useEffect(() => {
    fetchProducts();
    if (shoe[0]) {
      setShoeTitle(shoe[0].title);
      setShoeDesigner(shoe[0].designer);
      setShoeDescription(shoe[0].description);
      setShoeCount(shoe[0].count);
      setShoePrice(shoe[0].price);
      setShoeImage(shoe[0].image);
      setProductId(shoe[0].id);
    }
  }, []);

  const id = useParams();

  const [count, setCount] = useState("");

  const shoe = products.filter((product) => id.shoeId == product.id);

  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [productId, setProductId] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [shoeTitle, setShoeTitle] = useState("");
  const [shoeDesigner, setShoeDesigner] = useState("");
  const [shoeDescription, setShoeDescription] = useState("");
  const [shoeCount, setShoeCount] = useState("");
  const [shoePrice, setShoePrice] = useState("");
  const [shoeImage, setShoeImage] = useState("");

  if (!userId) {
    userId === null;
  }

  const handleClick = async (e) => {
    e.preventDefault();

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

    fetchOrderProducts();
    fetchProducts();
    setCartMessage("Item added to cart!");
    if (info.error) {
      return setError(info.error);
    }
  };

  return (
    <div key={productId} className="singleView">
      <h1 className="single-text">{shoeTitle}</h1>
      <img className="single-text" id="image" src={shoeImage} />
      <h2 className="single-text">{shoeDesigner}</h2>
      <h3 className="single-text">{shoeDescription}</h3>
      <h2 className="single-text">${shoePrice}</h2>
      <h3 className="single-text">Inventory: {shoeCount}</h3>
      <select
        value={count}
        onChange={(event) => {
          setCount(event.target.value);
        }}
      >
        <option className="quantity" value="any">
          Quantity
        </option>
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
      <p>{cartMessage}</p>
    </div>
  );
};

export default SingleShoe;
