import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateShoe = ({ products, setProducts, fetchProducts }) => {
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const params = useParams();
  //   console.log(params.shoeId);

  const filteredShoe = products.filter(
    (product) => params.shoeId == product.id
  );
  console.log("===>", filteredShoe);

  const navigate = useNavigate();

  const updateShoe = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/products/${params.shoeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

    console.log(info);
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
            {/* <select defaultValue="default" required>
          <option key="default" value="default" disabled>
            -- Select a Category --
          </option>
          <option>Boots</option>
          <option>Sandals</option>
          <option>Sneakers</option>
          <option>Heels</option>)
        </select> */}
            <button className="Admin-button">Submit</button>
            <button
              className="Admin-button"
              type="reset"
              onClick={() => {
                setTitle("");
                setDesigner("");
                setDescription("");
                setPrice("");
                // setCategory("");
              }}
            >
              <Link to="/admin">Cancel</Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateShoe;
