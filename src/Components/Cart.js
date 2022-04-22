import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import { getProductsFromCart } from '../api';

const Cart = ({}) => {
  const [error, setError] = useState('');
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const history = useNavigate();

  const fetchProductObjects = async () => {
    const productsArr = [];
    for (const product of cart.products) {
      const response = await fetchProductById(product.productId);
      productsArr.push(response[0]);
    }
    console.log(productsArr);
    return productsArr;
  };

  useEffect(() => {
    getProductsFromCart().then((cart) => {
      setCart(cart);
      fetchProductObjects().then((array) => {
        setProducts(array);
      });
    });
  }, []);
  console.log(products);
  return (
    <>
      <h2>Your Cart:</h2>
      <div className="AllProducts"></div>
    </>
  );
};
export default Cart;
