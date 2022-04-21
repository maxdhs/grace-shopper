import { useParams, useNavigate } from "react-router-dom";

const Product = ({ products, user, fetchUser }) => {
  let navigate = useNavigate();

  const { productId } = useParams();
  const product = products.find(
    (_product) => _product.id === Number(productId)
  );
  if (!products.length) {
    return <></>;
  }

  const handleAddToCart = async () => {
    const response = await fetch("/api/cart/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        price: product.price,
        orderId: user.cart.id,
        productId,
        quantity: 1,
      }),
    });
    const info = await response.json();
    if (info.error) {
      return;
    }
    await fetchUser();
    navigate("/cart");
  };

  let cartIds = [];

  if (user && user.cart) {
    cartIds = user.cart.products.map((product) => product.id);
  }

  return (
    <div className="products-container">
      <div key={product.id}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <img src={product.image}></img>
        <p>{product.description}</p>
        <>
          {user && cartIds.includes(product.id) && (
            <button onClick={() => navigate("/cart")}>In Cart</button>
          )}
          {user && !cartIds.includes(product.id) && (
            <>
              <button onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </button>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Product;
