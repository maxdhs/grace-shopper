import { Link } from "react-router-dom";

const Heels = ({ products }) => {
  let category = "Heels";
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      <div className="page-title">
        <h1>Heels</h1>
      </div>
      <div id="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="productView">
            <h2 className="product-text">
              <Link to={`/${product.id}`}>{product.title}</Link>
            </h2>
            <img className="product-text" id="image" src={product.image} />
            <h3 className="product-text">{product.designer}</h3>

            <h3 className="product-text">${product.price}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Heels;
