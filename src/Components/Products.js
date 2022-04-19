<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPeoducts } from '../api';

const linkStyle = {
  // color: "white",
  margin: '10px',
  fontSize: '15px',
  display: 'inline-block',
  marginRight: '.3em',
  textDecoration: 'none',
};
=======
const { useNavigate, Link } = require("react-router-dom");

import "./css/Products.css";
import MainCategories from "./MainCategories";
>>>>>>> 804d18e96e0367dbb5b5def013a18f3e49e5c173


const Products = ({products}) => {
    const navigate = useNavigate();

    return <div className="products_main">
        <MainCategories/>
        <div className="products_container">
            {products.map(product => {
                return <div 
                    key={product.id}
                >
                    <div 
                        className="products_content"
                        onClick={() => {
                            navigate(`/products/${product.id}`);
                        }}
                    >
                        <h1>{product.title}</h1>
                        <img src={product.imgURL}/>
                        <p>${product.price}</p>
                    </div>
                    <button>Add to cart</button>
                </div>
            })}
        </div>
    </div>
}

<<<<<<< HEAD
        <Link to="shoes" style={linkStyle}>
          SHOES
        </Link>

        <Link to="bags" style={linkStyle}>
          BAGS
        </Link>
      </nav>
    </>
  );
};
export default Products;
=======
export default Products;
>>>>>>> 804d18e96e0367dbb5b5def013a18f3e49e5c173
