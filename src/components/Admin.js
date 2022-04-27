// import { user } from "pg/lib/defaults";
import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = ({
  products,

  userData,
}) => {
  const [shoeId, setShoeId] = useState("");

  console.log(userData);

  if (localStorage.getItem("admin") === "true") {
    return (
      <>
        <h1 className="Admin">Admin</h1>
        <div className="Admin-actions">
          <div className="Admin-item">
            <h2 className="Admin-question">Want to update a shoe?</h2>
            {/* update  */}

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
          {/* add  */}
          <div className="Admin-item">
            <Link to="/add-shoe">
              <button id="Admin-newProduct">Add New Product</button>
            </Link>
          </div>
          {/* delete  */}
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
          </div>
        </div>
      </>
    );
  } else {
    return <h1 className="header">Unauthorized User</h1>;
  }
};

export default Admin;
