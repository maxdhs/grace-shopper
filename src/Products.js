import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Products = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  const { category } = useParams();

  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const _products = products.filter(
      (product) => product.category === category
    );
    setSelectedProducts(_products);
    if (!_products.length) {
      setSelectedProducts(products);
    }
  }, [products, category]);

  return (
    <div className="products-container">
      <div id="category-links">
        <Link to="/products/categories/all">All</Link>
        {allCategories.map((category) => (
          <Link key={category} to={`/products/categories/${category}`}>
            {category}
          </Link>
        ))}
      </div>
      {selectedProducts.map((product) => {
        return (
          <div key={product.id} onClick={() => handleNavigate(product.id)}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <img src={product.image}></img>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
