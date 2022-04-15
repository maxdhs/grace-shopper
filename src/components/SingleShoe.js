import { useNavigate, useParams } from "react-router-dom";

const SingleShoe = ({ products }) => {
  const { id } = useParams();
  const neededId = id;
  //   console.log(products);

  let singleShoe = products.filter((product) => product.id == neededId);
  //   console.log(singleShoe);
  return (
    <>
      {singleShoe.map((shoe) => (
        <div key={shoe.id}>
          <h2>{shoe.title}</h2>
          <img src={shoe.image} />
          <h4>{shoe.designer}</h4>
          <h4>{shoe.description}</h4>
          <h4>${shoe.price}</h4>
          <h4>Inventory: {shoe.count}</h4>
        </div>
      ))}
    </>
  );
};

export default SingleShoe;
