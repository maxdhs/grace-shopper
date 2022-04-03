const Products = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <img src={product.image}></img>
            <p>{product.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
