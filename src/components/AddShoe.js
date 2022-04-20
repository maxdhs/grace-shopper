import { useState } from "react";

const AddShoe = ({ token, fetchProducts }) => {
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleShoes = async (e) => {
    console.log(title, designer, description, price, count, image, category);
    e.preventDefault();
    const resp = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    console.log(info);
    fetchProducts();
  };

  return (
    <div>
      <h1>Add a Product</h1>
      <form onSubmit={handleShoes}>
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
        <label
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          Select category
        </label>
        <select>
          <option value="Boots">Boots</option>
          <option value="Heels">Heels</option>
          <option value="Sandals">Sandals</option>
          <option value="Sneakers">Sneakers</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddShoe;
