import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  editProductCount,
  fetchProductById,
  RemoveProductFromCart,
  getProductsFromCart,
  fetchProducts,
} from '../api';

import './css/Cart.css';

const Cart = ({}) => {
  const [error, setError] = useState('');
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const token = localStorage.getItem('token');
  const history = useNavigate();

  const fetchProductObjects = async (cart) => {
    const productsArr = [];
    for (const product of cart.products) {
      const response = await fetchProductById(product.productId);
      productsArr.push(response[0]);
    }
    setProducts(productsArr);
  };

  const RemoveFromCart = async (id) => {
    const newarr = products.filter((product) => {
      if (product.productId === id) {
        return false;
      } else {
        return true;
      }
    });
    setProducts(newarr);
    if (!token) {
      localStorage.setItem('products', JSON.stringify(newarr));
    } else {
      history(0);
      const remove = await RemoveProductFromCart(id);
    }
  };

  const handleCount = async (product, cartproduct, value) => {
    // event.preventDefault();
    // const cartData = { ...cart };
    // console.log(cartData);
    // let data = [...cart.products];
    // data[index].count = Number(event.target.value);
    // setCart(cartData);
    console.log(value);
    let newarr = [];
    if (!token) {
      newarr = products.filter((crnt) => {
        if (crnt.productId === product.productId) {
          crnt.count = Number(value);
        }
        return true;
      });
      setProducts(newarr);
      localStorage.setItem('products', JSON.stringify(newarr));
    } else {
      console.log(product);
      newarr = products.filter((crnt) => {
        if (crnt.productId === product.productId) {
          crnt.count = Number(value);
          cartproduct.count = Number(value);
        }
        return true;
      });
      console.log(newarr);
      setProducts(newarr);
      const edit = await editProductCount(value, product.id);
      console.log(edit);
    }
    history(0);
  };

  useEffect(() => {
    async function getData() {
      if (!token) {
        const lsproducts = JSON.parse(localStorage.getItem('products'));
        if (lsproducts) {
          setProducts(lsproducts);
        }
        return;
      }
      const cart = await getProductsFromCart();
      if (cart) {
        setCart(cart);
        const cartproducts = await fetchProductObjects(cart);
        console.log(cartproducts);
        if (cartproducts) {
          setProducts(cartproducts);
        }
      }
    }
    getData();
  }, []);
  let total = 0;
  return (
    <>
      <div className="cart_main">
        <h2>Your Cart:</h2>
        <div className="AllProducts">
          {token ? (
            products[0] ? (
              products.map((product, index) => {
                const [cartproduct] = cart.products.filter((cartproduct) => {
                  if (product.id === cartproduct.productId) {
                    return true;
                  }
                });
                let productTotal = product.price * cartproduct.count;
                total += productTotal;
                return (
                  <div key={product.id} className="cart_content">
                    <div>
                      <img src={product.imgURL}></img>
                    </div>
                    <div>
                      <h3>
                        {product.title} | ${product.price}
                      </h3>
                    </div>
                    <div>
                      <input
                        type="number"
                        defaultValue={cartproduct.count}
                        min="1"
                        max={cartproduct.inventory}
                        key={index}
                        onChange={(event) =>
                          handleCount(product, cartproduct, event.target.value)
                        }
                      />
                      <h4>Subtotal: ${productTotal}</h4>
                    </div>
                    <button onClick={() => RemoveFromCart(product.id)}>
                      Remove from cart
                    </button>
                  </div>
                );
              })
            ) : (
              <h2>There are no products in your cart</h2>
            )
          ) : products[0] ? (
            products.map((product, index) => {
              let productTotal = product.price * product.count;
              total += productTotal;
              return (
                <div key={product.id} className="cart_content">
                  <div>
                    <img src={product.imgURL}></img>
                  </div>
                  <div>
                    <h3>
                      {product.title} | ${product.price}
                    </h3>
                  </div>
                  <div>
                    <input
                      type="number"
                      defaultValue={product.count}
                      min="1"
                      max={product.inventory}
                      key={index}
                      onChange={(event) =>
                        handleCount(product, event.target.value)
                      }
                    />
                    <h4>Subtotal: ${productTotal}</h4>
                  </div>
                  <button onClick={() => RemoveFromCart(product.productId)}>
                    Remove from cart
                  </button>
                </div>
              );
            })
          ) : (
            <div>
              <h2>There are no products in your cart</h2>
            </div>
          )}
          <h1 className="total">Total: {total}</h1>
        </div>
      </div>
    </>
  );
};
export default Cart;