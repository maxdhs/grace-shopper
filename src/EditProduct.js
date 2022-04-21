import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const EditProduct = ({ products, user, fetchProducts }) => {
  if (!products.length) {
    return <></>;
  }

  const navigate = useNavigate();

  const { productId } = useParams();
  const product = products.find((_product) => _product.id === +productId);

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [error, setError] = useState("");

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, description, price, category, image }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    await fetchProducts();
  };

  const handleDeleteProduct = async (e, productId) => {
    e.preventDefault();
    setError("");
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    await fetchProducts();
    navigate("/admin/products");
  };

  return (
    <div>
      <h3>Edit Product:</h3>
      <form onSubmit={handleEditProduct}>
        <input
          required
          placeholder="Enter title.."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          required
          placeholder="Enter description.."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          required
          placeholder="Enter price.."
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          value={price}
        />
        <input
          required
          placeholder="Enter category.."
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          required
          placeholder="Enter imageUrl.."
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />

        <button>Edit Product</button>
        <p>{error}</p>
      </form>
      <hr></hr>
      <div className="products-container">
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <img src={product.image}></img>
          <button onClick={(e) => handleDeleteProduct(e, product.id)}>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
