import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateShoe = ({ products, setProducts, fetchProducts, userData }) => {
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const params = useParams();

  const filteredShoe = products.filter(
    (product) => params.shoeId == product.id
  );

  const lsToken = localStorage.getItem("token");

  const navigate = useNavigate();

  const updateShoe = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/products/${params.shoeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
      body: JSON.stringify({
        title,
        designer,
        description,
        price,
        category,
      }),
    });

    const info = await response.json();

    if (info.error) {
      setError(info.message);
    }

    setTitle("");
    setDesigner("");
    setDescription("");
    setPrice("");
    setCategory("");

    navigate("/admin");
    await fetchProducts();
    return info;
  };

  return (
    <>
      <div className="Admin-update">
        <div className="Admin-item">
          <h1>Update Shoe</h1>
        </div>
        <div>
          <form className="Update-forms" onSubmit={updateShoe}>
            <input
              type="text"
              placeholder={filteredShoe[0].title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder={filteredShoe[0].designer}
              value={designer}
              onChange={(e) => {
                setDesigner(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder={filteredShoe[0].description}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder={filteredShoe[0].price}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option key="default" value="default" disabled>
                -- Select a Category --
              </option>
              <option value="Boots">Boots</option>
              <option value="Sandals">Sandals</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Heels">Heels</option>)
            </select>
            <button className="Admin-button">Submit</button>
            <button
              className="Admin-button"
              type="reset"
              onClick={() => {
                setTitle("");
                setDesigner("");
                setDescription("");
                setPrice("");
                setCategory("");
              }}
            >
              <Link to="/admin">Cancel</Link>
            </button>
          </form>
        </div>
      </div>
      <p>{error}</p>
    </>
  );
};

export default UpdateShoe;
