import { useState } from "react";

const Sneakers = ({ products, setProducts }) => {
  console.log(products);
  let category = "Sneakers";
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  //   setProducts(filteredProducts);
  console.log(filteredProducts);
  return (
    <>
      <h1>Boots</h1>

      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.image} />
          <h4>{product.designer}</h4>
          <h4>{product.description}</h4>
          <h4>${product.price}</h4>
          <h4>Inventory: {product.count}</h4>
        </div>
      ))}
    </>
  );
};

export default Sneakers;
