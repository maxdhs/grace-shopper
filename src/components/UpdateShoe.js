import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateShoe = ({ products, setProducts }) => {
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
    return info;
  };

  return (
    <>
      <h1>Update Shoe</h1>
      <form onSubmit={updateShoe}>
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
        <select defaultValue="default" required>
          <option key="default" value="default" disabled>
            -- Select a Category --
          </option>
          <option>Boots</option>
          <option>Sandals</option>
          <option>Sneakers</option>
          <option>Heels</option>)
        </select>
        <button>Submit</button>
        <button
          type="reset"
          onClick={() => {
            setTitle("");
            setDesigner("");
            setDescription("");
            setPrice("");
            setCategory("");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default UpdateShoe;
