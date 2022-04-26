import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import { getProductsFromCart } from '../api';

import "./css/Cart.css";

const Cart = ({}) => {
  const [error, setError] = useState('');
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const token = localStorage.getItem('token');

  const fetchProductObjects = async (cart) => {
    const productsArr = [];
    for (const product of cart.products) {
      const response = await fetchProductById(product.productId);
      productsArr.push(response[0]);
    }
    setProducts(productsArr);
  };

  const handleCount = (index,event) => {
    event.preventDefault();
    const cartData = {... cart};
    console.log(cartData);
    let data = [... cart.products];
    data[index].count = Number(event.target.value);
    setCart(cartData);
  }

  useEffect(() => {
    async function getData() {
      if (!token) {
        const lsproducts = JSON.parse(localStorage.getItem('products'));
        console.log(lsproducts);
        setProducts(lsproducts);
        return;
      }
      const cart = await getProductsFromCart();
      if (cart) {
        setCart(cart);
        const products = await fetchProductObjects(cart);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className="cart_main">
      <h2>Your Cart:</h2>
        {token
          ? products.map((product,index) => {
              const [cartproduct] = cart.products.filter((cartproduct) => {
                if (product.id === cartproduct.productId) {
                  return true;
                }
              });
              let productTotal = product.price * cartproduct.count;
              return (
                <div 
                  key={product.id}
                  className="cart_content"
                >
                  <div>
                    <img src={product.imgURL}></img>
                  </div>
                  <div>
                    <h3>{product.title} | ${product.price}</h3>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      max={product.inventory}
                      key={index}
                      value={cartproduct.count}
                      onChange={event => handleCount(index, event)}
                    />
                    <h4>Subtotal: ${productTotal}</h4>
                  </div>
                </div>
              );
            })
          : products.map((product) => {
              return (
                <div 
                  key={product.productId}
                  className="cart_content"
                >
                  <h2>{product.title}</h2>
                  <h3>Price: ${product.price}</h3>
                  <h3>Count: {product.count}</h3>
                  <img src={product.imgURL}></img>
                </div>
              );
            })}
      </div>
    </>
  );
};
export default Cart;
