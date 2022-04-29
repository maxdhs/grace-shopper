const { useNavigate, Link } = require('react-router-dom');
import { NotificationManager } from 'react-notifications';
import { addToCart } from '../api';

import './css/Products.css';

const Products = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="products_main">
      {/* <MainCategories /> */}
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
              <button
                onClick={(e) => {
                  const response = addToCart(product.price, product.id, 1);
                  const response = addToCart(
                    product.price,
                    product.id,
                    1,
                    product.imgURL,
                    product.title,
                    product.description
                  );
                  if (response) {
                    NotificationManager.success(
                      'Added 1 item(s) to cart!',
                      'Success!',
                      1500
                    );
                  }
                }}
              >
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
