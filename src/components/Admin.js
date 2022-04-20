// import { user } from "pg/lib/defaults";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = ({ products, setProducts, allUsers, fetchProducts }) => {
  // console.log(allUsers);
  const [shoeId, setShoeId] = useState("");

  // const deleteShoe = async (shoeId) => {
  //   const resp = await fetch(`/api/products/${shoeId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });

  //   const info = await resp.json();

  //   fetchProducts();

  //   console.log("delete info here", info);
  //   return info;
  // };

  // if (!allUsers) {
  //   return <></>;
  // }

  return (
    <>
      <h1>Admin</h1>
      <h2>Want to update a shoe?</h2>
      <form>
        <select
          defaultValue="default"
          onChange={(e) => {
            setShoeId(e.target.value);
          }}
        >
          <option key="default" value="default" disabled>
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
        <button>
          <Link to={`/updateshoe/${shoeId}`}>Submit</Link>
        </button>
      </form>

      <Link to="/add-shoe">
        <button>Add New Product</button>
      </Link>

      <h2>Want to delete a shoe?</h2>
      <form>
        <select
          defaultValue="default"
          onChange={(e) => {
            setShoeId(e.target.value);
          }}
        >
          <option key="default" value="default" disabled>
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
        <button>
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
    </>
  );
};

export default Admin;
