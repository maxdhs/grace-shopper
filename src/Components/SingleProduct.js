import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, fetchProductById, fetchReviews } from "../api";
import Products from "./Products";

import "./css/SingleProduct.css";
import { NotificationManager } from "react-notifications";

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [count, setCount] = useState(1);
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
        // <div className="single-product_main">
            <div className="single-product_container">
                <div 
                    key={product.id}
                    className="single-product_content"
                >
                    <img src={product.imgURL}/>
                </div>
                <div className="single-product_details">
                    <div className="single-product_header">
                        <h1>{product.title}</h1>
                        <p>${product.price}</p>
                    </div>
                    <p id="description">{product.description}</p>
                    <h2>Reviews: </h2>
                    {mainReviews.map(review => {
                        return (review?.id ?
                            <div key={review?.id}>
                                {review && <p>{review.message}</p>}
                            </div>
                            :
                            null
                        )
                    })}
                    <input
                        type="number"
                        min="1"
                        max={product.inventory}
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    />
                    <button
                        onClick={() => {
                        const response = addToCart(product.price, product.id, count);
                        if (response) {
                            NotificationManager.success(
                            `Added ${count} item(s) to cart!`,
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
        // </div>
    )
};

export default SingleProduct;