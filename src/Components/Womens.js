import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from ".";
import { fetchPeoducts } from "../api";

const Womens = ({ setProducts, products }) => {
	const history = useNavigate();
	return (
		<>
			<h4>All Women's clothing</h4>
			<div>
				{products
					.filter((product) => product.category == "womens")

					.map(({ category, description, inventory, price, id, title }) => {
						console.log("womens", products);
						return (
							<div key={id} className=" womens-details">
								<p> {title}</p>
								<p>{description} </p>
								<p>{price}</p>
								<p>{inventory}</p>
							</div>
						);
					})}
			</div>
		</>
	);
};
export default Womens;
