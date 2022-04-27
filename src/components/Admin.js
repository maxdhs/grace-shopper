// import { user } from "pg/lib/defaults";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Admin = ({
  products,
  setProducts,
  allUsers,
  fetchProducts,
  userData,
  fetchUser,
}) => {
  const [shoeId, setShoeId] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  if (userData.isAdmin) {
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
                <button className="Admin-button">
                  {/* <Link to={`/updateshoe/${shoeId}`}> */}
                  Submit
                  {/* </Link> */}
                </button>
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
            {/* <div>
        <h2>Registered Users: </h2>
        {allUsers.map((user) => {
          return (
            <div key={user.id}>
              <h2>ID: {user.id}</h2>
              <h3>Email: {user.email}</h3>
            </div>
          );
        })}
      </div> */}
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Unauthorized User</h1>;
  }
};

export default Admin;
