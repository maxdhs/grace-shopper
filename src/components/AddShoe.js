import { useState } from "react";

const AddShoe = ({ fetchProducts, error, setError }) => {
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const lsToken = localStorage.getItem("token");

  // const lsToken = localStorage.getItem("token");

  const handleShoes = async (e) => {
    setError("");
    e.preventDefault();
    const resp = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
      body: JSON.stringify({
        title,
        designer,
        description,
        price,
        count,
        image,
        category,
      }),
    });
    const info = await resp.json();
    if (info.error) {
      setError(info.message);
      throw info.message;
    }

    fetchProducts();

    setTitle("");
    setDesigner("");
    setDescription("");
    setPrice("");
    setCount("");
    setImage("");
    setCategory("");
    setError("Product added!");
  };

  return (
    <div className="Admin-add">
      <h1 className="Admin-item">Add a Product</h1>
      <form onSubmit={handleShoes}>
        <div className="Admin-addForm">
          <input
            required
            placeholder="Enter product title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            required
            placeholder="Enter designer..."
            value={designer}
            onChange={(e) => setDesigner(e.target.value)}
          />
          <input
            required
            placeholder="Enter product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            required
            placeholder="Enter product price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            required
            placeholder="Enter inventory quantity..."
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            required
            placeholder="Enter image url..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        {/* <div>
          <label className="category" required value="default">
            Select category
          </label>
        </div> */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option key="default" value="default">
            -- Select a Category --
          </option>
          <option value="Boots">Boots</option>
          <option value="Heels">Heels</option>
          <option value="Sandals">Sandals</option>
          <option value="Sneakers">Sneakers</option>
        </select>
        <button className="Admin-addForm" type="submit">
          Submit
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default AddShoe;
