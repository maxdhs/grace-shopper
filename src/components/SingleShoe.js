import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const API_ORDERS = "/api/orders";

const SingleShoe = ({
  products,
  fetchProducts,
  userId,
  orderInfo,
  fetchOrderProducts,
  orderProducts,
}) => {
  const id = useParams();

  const shoe = products.filter((product) => id.shoeId == product.id);
  const lsOrderId = localStorage.getItem("orderId");
  const orderProduct = orderProducts.filter(
    (product) => lsOrderId == product.orderId
  );
  let productArr = [];
  for (let i = 0; i < orderProduct.length; i++) {
    const productId = orderProduct[i].productId;
    productArr.push(productId);
  }

  let finalProducts = [];

  for (let j = 0; j < productArr.length; j++) {
    let product = productArr[j];

    for (let l = 0; l < products.length; l++) {
      let product1 = products[l];

      if (product === product1.id) {
        finalProducts.push(product1);
      }
    }
  }
  console.log(products);
  console.log(finalProducts);

  const thisShoe = finalProducts.filter((product) => shoe[0].id === product.id);

  console.log(shoe);
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

  useEffect(() => {
    if (shoe[0]) {
      setShoeTitle(shoe[0].title);
      setShoeDesigner(shoe[0].designer);
      setShoeDescription(shoe[0].description);
      setShoeCount(shoe[0].count);
      setShoePrice(shoe[0].price);
      setShoeImage(shoe[0].image);
      setProductId(shoe[0].id);
    }
  }, [shoe[0]]);

  const handleClick = async (e) => {
    e.preventDefault();
    const count = 1;
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

  console.log(thisShoe);

  return (
    <div key={productId} className="singleView">
      <h1 className="single-text">{shoeTitle}</h1>
      <img className="single-text" id="image" src={shoeImage} />
      <h2 className="single-text">{shoeDesigner}</h2>
      <h3 className="single-text">{shoeDescription}</h3>
      <h2 className="single-text">${shoePrice}</h2>
      <h3 className="single-text">Inventory: {shoeCount}</h3>
      {!thisShoe.length ? (
        <>
          <button id="add-button" onClick={handleClick} className="single-text">
            Add To Cart
          </button>
          <p>{cartMessage}</p>
        </>
      ) : null}
    </div>
  );
};

export default SingleShoe;
