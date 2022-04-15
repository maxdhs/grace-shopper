import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllShoes = ({ products, fetchProducts }) => {
  const [search, setSearch] = useState("");

  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);

  console.log(products);

  const filter = (product, text) => {
    text = text.toLowerCase();
    if (
      product.title.toLowerCase().includes(text) ||
      product.designer.toLowerCase().includes(text) ||
      product.description.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filteredProducts = products.filter((filterProduct) =>
    filter(filterProduct, search)
  );

  const productsToDisplay = search.length ? filteredProducts : products;

  return (
    <>
      <div className="page-title">
        <h1>All Shoes</h1>
      </div>
      <div id="products">
        <div id="search">
          <input
            type="text"
            className="textInput"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Shoes"
          ></input>
          {productsToDisplay.map((product) => {
            return (
              <div key={product.id} className="productView">
                <h2 className="product-text">
                  <Link to={`/${product.id}`}>{product.title}</Link>
                </h2>
                <img className="product-text" id="image" src={product.image} />
                <h4 className="product-text">{product.designer}</h4>
                <h4 className="product-text">{product.description}</h4>
                <h4 className="product-text">${product.price}</h4>
                <h4 className="product-text">Inventory: {product.count}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllShoes;
