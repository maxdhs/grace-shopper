import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = ({ products, allUsers }) => {
  const [shoeId, setShoeId] = useState("");

  return (
    <>
      <h1 className="Admin">Admin</h1>
      <div className="Admin-actions">
        <div className="Admin-item">
          <h2 className="Admin-question">Want to update a shoe?</h2>

          <form className="Admin-forms">
            <select
              defaultValue="default"
              onChange={(e) => {
                setShoeId(e.target.value);
              }}
            >
              <option
                className="Admin-option"
                key="default"
                value="default"
                disabled
              >
                Select a Product
              </option>
              {products.map((product) => {
                return (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                );
              })}
            </select>
            <Link to={`/updateshoe/${shoeId}`}>
              <button className="Admin-button">Submit</button>
            </Link>
          </form>
        </div>

        <div className="Admin-item">
          <Link to="/add-shoe">
            <button id="Admin-newProduct">Add New Product</button>
          </Link>
        </div>

        <div className="Admin-item">
          <h2 className="Admin-question">Want to delete a shoe?</h2>
          <form className="Admin-forms">
            <select
              defaultValue="default"
              onChange={(e) => {
                setShoeId(e.target.value);
              }}
            >
              <option
                className="Admin-option"
                key="default"
                value="default"
                disabled
              >
                Select a Product
              </option>
              {products.map((product) => {
                return (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                );
              })}
            </select>
            <button className="Admin-button">
              <Link to={`/deleteShoe/${shoeId}`}>Submit</Link>
            </button>
          </form>
          {allUsers.length ? (
            <div>
              <h2>Registered Users: </h2>
              {allUsers.map((user) => {
                return (
                  <div key={user.id}>
                    <h2>ID: {user.id}</h2>
                    <h3>Email: {user.email}</h3>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Admin;
