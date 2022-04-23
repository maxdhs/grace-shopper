import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import { getProductsFromCart } from '../api';

const Cart = ({}) => {
  const [error, setError] = useState('');
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const history = useNavigate();
  const token = localStorage.getItem('token');

  const fetchProductObjects = async (cart) => {
    const productsArr = [];
    for (const product of cart.products) {
      const response = await fetchProductById(product.productId);
      productsArr.push(response[0]);
    }
    setProducts(productsArr);
  };

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
  console.log(cart);
  return (
    <>
      <h2>Your Cart:</h2>
      <div className="AllProducts">
        {token
          ? products.map((product) => {
              const [cartproduct] = cart.products.filter((cartproduct) => {
                if (product.id === cartproduct.productId) {
                  return true;
                }
              });
              console.log(cartproduct);
              return (
                <div key={product.id}>
                  <h2>{product.title}</h2>
                  <h3>{product.description}</h3>
                  <h3>Price: ${cartproduct.price}</h3>
                  <h3>Count: {cartproduct.count}</h3>
                  <img src={product.imgURL}></img>
                </div>
              );
            })
          : products.map((product) => {
              return (
                <div key={product.productId}>
                  <h2>{product.title}</h2>
                  <h3>{product.description}</h3>
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
