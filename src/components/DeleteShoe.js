import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const deleteShoe = ({ products, setProducts }) => {
  const params = useParams();

  const filteredShoe = products.filter(
    (product) => params.shoeId == product.id
  );

  let navigate = useNavigate();

  const deleteShoe = async (e) => {
    const resp = await fetch(`/api/products/${params.shoeId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const info = await resp.json();
    navigate("/admin");
    return info;
  };

  return (
    <>
      <h1>Are you sure you want to delete this shoe?</h1>
      {filteredShoe ? (
        <>
          <div key={filteredShoe[0].id} className="singleView">
            <h1 className="single-text">{filteredShoe[0].title}</h1>
            <img
              className="single-text"
              id="image"
              src={filteredShoe[0].image}
            />
            <h2 className="single-text">{filteredShoe[0].designer}</h2>
            <h3 className="single-text">{filteredShoe[0].description}</h3>
            <h2 className="single-text">${filteredShoe[0].price}</h2>
            <h3 className="single-text">Inventory: {filteredShoe[0].count}</h3>
          </div>
          <form>
            <button
              onClick={(e) => {
                deleteShoe(e.target.value);
              }}
            >
              Yes
            </button>
            <Link to="/admin">
              <button type="reset">Cancel</button>
            </Link>
          </form>
        </>
      ) : null}
    </>
  );
};

export default deleteShoe;
