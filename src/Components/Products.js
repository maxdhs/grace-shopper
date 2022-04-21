const { useNavigate, Link } = require('react-router-dom');

import { addToCart } from '../api';
import './css/Products.css';
import MainCategories from './MainCategories';

const Products = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="products_main">
      <MainCategories />
      <div className="products_container">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div
                className="products_content"
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
              >
                <h1>{product.title}</h1>
                <img src={product.imgURL} />
                <p>${product.price}</p>
              </div>
              <button onClick={(e) => addToCart(product.price, product.id, 1)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
