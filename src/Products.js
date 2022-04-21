import { useNavigate } from "react-router-dom";

const Products = ({ products }) => {
  const navigate = useNavigate();
  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="products-container">
      {products.map((product) => {
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
