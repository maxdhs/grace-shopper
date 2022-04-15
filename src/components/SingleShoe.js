import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SingleShoe = ({ products, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const id = useParams();

  const shoe = products.filter((product) => id.shoeId == product.id);
  console.log(shoe);
  return (
    <div key={shoe[0].id} className="singleView">
      <h2 className="single-text">{shoe[0].title}</h2>
      <img className="single-text" id="image" src={shoe[0].image} />
      <h4 className="single-text">{shoe[0].designer}</h4>
      <h4 className="single-text">{shoe[0].description}</h4>
      <h4 className="single-text">${shoe[0].price}</h4>
      <h4 className="single-text">Inventory: {shoe[0].count}</h4>
      <button className="single-text">Add To Cart</button>
    </div>
  );
};

export default SingleShoe;
