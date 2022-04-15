import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import SingleShoe from "./SingleShoe";

const Boots = ({ products, setProducts }) => {
  let category = "Boots";
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      <Routes>
        <Route
          exact
          path="singleshoe/:id"
          element={<SingleShoe products={products} />}
        />
      </Routes>

      <h1>Boots</h1>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.image} />
          <h4>{product.designer}</h4>
          <h4>{product.description}</h4>
          <h4>${product.price}</h4>
          <h4>Inventory: {product.count}</h4>
          <Link to={`SingleShoe/${product.id}`}>See More Details</Link>
        </div>
      ))}
    </>
  );
};

export default Boots;
