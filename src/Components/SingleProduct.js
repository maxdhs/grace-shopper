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
    return (
        <div className="single-product_main">
            <div className="single-product_container">
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
                            <div key={review.id}>
                                {review && <p>{review.message}</p>}
                            </div>
                        )
                    })}
                    <button
                        onClick={() => {
                        const response = addToCart(product.price, product.id, 1);
                        if (response) {
                            NotificationManager.success(
                            'Added 1 item(s) to cart!',
                            'Success!',
                            1500
                            );
                        }
                        }}
                    >
                        Add to cart
                </button>
                </div>
            </div>
        </div>
    )
};

export default SingleProduct;