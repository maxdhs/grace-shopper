import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api";
import Products from "./Products";

import "./css/SingleProduct.css";

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetchProductById(id)
            .then(product => {
                setProduct(product);
            })
    },[])
    return (
        <div className="single-product_main">
            <div className="single-product_container">
                {product.map(item => {
                    return(
                        <>
                        <div 
                            key={item.id}
                            className="single-product_content"
                        >
                            <h1>{item.title}</h1>
                            <img src={item.imgURL}/>
                            <p>{item.price}</p>
                        </div>
                        <div className="single-product_details">
                            <h2>Description: </h2>
                            <p>{item.description}</p>
                            <button>Add to cart</button>
                        </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
};

export default SingleProduct;