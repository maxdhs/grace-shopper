import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminProducts = ({ products, user, fetchProducts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleNavigate = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    try {
      const response = await fetch("/api/products/image", {
        method: "POST",
        body: data,
      });
      const info = await response.json();
      return info;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    const info = await uploadImage();
    if (info.error) {
      setError(info.error.message);
      return;
    }
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          description,
          price,
          category,
          image: info.image.url,
        }),
      });
      const info2 = await response.json();
      if (info2.error) {
        setError(info2.error);
        return;
      }
      await fetchProducts();
      navigate("/products");
    } catch (error) {
      console.log(error);
    }

    if (info.error) {
      return setError(info.error);
    }
    await fetchProducts();
  };

  return (
    <div>
      <h3>Add New Product:</h3>
      <form onSubmit={handleAddProduct}>
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
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>

        <button>Add Product</button>
        <p>{error}</p>
      </form>
      <hr></hr>
      <div className="products-container">
        {products.map((product) => {
          return (
            <div key={product.id} onClick={() => handleNavigate(product.id)}>
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <img src={product.image}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProducts;
