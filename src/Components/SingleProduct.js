import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, fetchProductById } from '../api';
import Products from './Products';

import './css/SingleProduct.css';
import { NotificationManager } from 'react-notifications';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetchProductById(id).then((product) => {
      setProduct(product[0]);
    });
  }, []);
  return (
    <div className="single-product_main">
      <div className="single-product_container">
        <div className="single-product_content">
          <h1>{product.title}</h1>
          <img src={product.imgURL} />
          <p>{product.price}</p>
        </div>
        <div className="single-product_details">
          <h2>Description: </h2>
          <p>{product.description}</p>
          <input
            type="number"
            min="1"
            max={product.inventory}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          ></input>
          <button
            onClick={(e) => {
              const response = addToCart(product.price, product.id, count);
              if (response) {
                NotificationManager.success(
                  'Added ' + count + ' item(s) to cart!',
                  'Success!',
                  1500
                );
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
