const { useNavigate, Link } = require('react-router-dom');
import { NotificationManager } from 'react-notifications';

import { addToCart } from '../api';
import './css/Products.css';
import MainCategories from './MainCategories';

const Products = ({ products }) => {
  const navigate = useNavigate();

  // const addToCartHandler = async(e) => {
  //   e.preventDefault();
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }
  // const addToCartHandler = async (product) => {
  //   const response = await addToCart(product.price, product.id, 1);
  //   console.log(response);
  //   if (response.id) {
  //     NotificationManager.success('Added 1 item(s) to cart!', 'Success!', 1500);
  //   }
  // };

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
              <button
                onClick={(e) => {
                  // const response = addToCart(product.price, product.id, 1);
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
