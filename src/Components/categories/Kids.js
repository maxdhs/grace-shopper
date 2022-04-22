import { useNavigate } from 'react-router-dom';
import MainCategories from '../MainCategories';
import { addToCart } from '../../api';
import { NotificationManager } from 'react-notifications';

const Kids = ({ products }) => {
  const navigate = useNavigate();
  const filteredProducts = products.filter((product) => {
    if (product.category === 'kids') {
      return true;
    }
  });
  return (
    <div className="products_main">
      <MainCategories />
      <div className="products_container">
        {filteredProducts.map((product) => {
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

export default Kids;
