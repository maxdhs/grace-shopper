import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchReviews } from "../api";
import Products from "./Products";

import "./css/SingleProduct.css";

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetchProductById(id)
            .then(product => {
                setProduct(product[0]);
            });
        fetchReviews(id)
            .then(review => {
                setReviews(review);
            });
    },[]);
    const mainReviews = reviews.map(review => {
        return review.reviews[0];
    });
    console.log(mainReviews,"here are the main reviews");
    return (
        <div className="single-product_main">
            <div className="single-product_container">
                {/* {product.map(item => { */}
                    {/* return( */}
                        <>
                        <div 
                            key={product.id}
                            className="single-product_content"
                        >
                            <h1>{product.title}</h1>
                            <img src={product.imgURL}/>
                            <p>{product.price}</p>
                        </div>
                        <div className="single-product_details">
                            <h2>Description: </h2>
                            <p>{product.description}</p>
                            <h2>Reviews: </h2>
                            {mainReviews.map(review => {
                                return (
                                    <div>
                                        {review && <p>{review.message}</p>}
                                    </div>
                                )
                            })}
                            <button>Add to cart</button>
                        </div>
                        </>
                    {/* ) */}
                {/* })} */}
            </div>
        </div>
    )
};

export default SingleProduct;