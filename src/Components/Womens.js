import { useNavigate } from 'react-router-dom';

const Womens = ({ products }) => {
  console.log(products);
  const history = useNavigate();
  return (
    <>
      <h4>All Women's clothing</h4>
      <div>
        {products.map((product) => {
          return <h1> {product.title}</h1>;
        })}
      </div>
    </>
  );
};
export default Womens;
