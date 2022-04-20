import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import SingleShoe from "./SingleShoe";

const Boots = ({ products, setProducts }) => {
  let category = "Boots";
  const filteredProducts = products.filter(
    (product) => product.category == category
  );

  return (
    <>
      <div className="page-title">
        <h1>Boots</h1>
      </div>
      <div id="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="productView">
            <h2 className="product-text">
              <Link to={`/${product.id}`}>{product.title}</Link>
            </h2>
            <img className="product-text" id="image" src={product.image} />
            <h3 className="product-text">{product.designer}</h3>
            {/* <h4 className="product-text">{product.description}</h4> */}
            <h3 className="product-text">${product.price}</h3>
            {/* <h4 className="product-text">Inventory: {product.count}</h4> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Boots;
