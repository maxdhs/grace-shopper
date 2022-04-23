import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllShoes = ({ products }) => {
  const [search, setSearch] = useState("");

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
        </div>
      </div>
      <div id="products">
        {productsToDisplay.map((product) => {
          return (
            <div key={product.id} className="productView">
              <h2 className="product-text">
                <Link to={`/${product.id}`}>{product.title}</Link>
              </h2>
              <Link to={`/${product.id}`}>
                <img className="product-text" id="image" src={product.image} />
              </Link>
              <h3 className="product-text">{product.designer}</h3>

              <h3 className="product-text">${product.price}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllShoes;
