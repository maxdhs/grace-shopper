import { useNavigate } from "react-router-dom";

const Cart = ({ user, fetchUser }) => {
  const navigate = useNavigate();
  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (!user) {
    return <></>;
  }

  const handleCheckout = async () => {
    const cartId = user.cart.id;
    const response = await fetch(`/api/cart/${cartId}/checkout`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    await response.json();
    await fetchUser();
  };

  return (
    <>
      <div className="products-container">
        {user.cart.products.map((product) => {
          return (
            <div key={product.id}>
              <div>
                <h3 onClick={() => handleNavigate(product.id)}>
                  {product.title}
                </h3>
                <p>${product.price}</p>
                <img src={product.image}></img>
              </div>
              <EditForm product={product} user={user} fetchUser={fetchUser} />
            </div>
          );
        })}
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </>
  );
};

const EditForm = ({ product, user, fetchUser }) => {
  const handleEditQuantity = async (newQuantity) => {
    if (newQuantity < 1) {
      handleDeleteItem(product.cart_item_id);
      return;
    }
    const response = await fetch("/api/cart/edit-item-quantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        quantity: newQuantity,
        cart_item_id: product.cart_item_id,
      }),
    });
    await response.json();
    await fetchUser();
  };

  const handleDeleteItem = async (cartItemId) => {
    const response = await fetch(`/api/cart/delete-item/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    await response.json();
    await fetchUser();
  };

  return (
    <>
      <div>Quantity in Cart: {product.quantity} </div>
      <div onClick={() => handleEditQuantity(product.quantity + 1)}>
        Add One
      </div>
      <div onClick={() => handleEditQuantity(product.quantity - 1)}>
        Minus One
      </div>
    </>
  );
};

export default Cart;
