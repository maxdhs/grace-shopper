import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Womens = ({ setProducts, products }) => {
	const history = useNavigate();
	return (
		<>
			<h4>All Women's clothing</h4>
			<div>
				{products
					.filter((product) => product.category == "womens")

					.map(
						({
							category,
							description,
							inventory,
							price,
							id,
							title,
							imgURL,
						}) => {
							console.log("womens", products);
							return (
								<div key={id} className=" womens-details">
									<p> {title}</p>
									<p>{description} </p>
									<p>{price}</p>
									<p>{inventory}</p>
									<img src={imgURL} width="100" />
								</div>
							);
						}
					)}
			</div>
		</>
	);
};
export default Womens;
