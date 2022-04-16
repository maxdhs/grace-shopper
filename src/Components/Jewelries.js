import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jewelries = ({ setProducts, products }) => {
	const history = useNavigate();
	return (
		<>
			<h4>All Jewelries</h4>
			<div>
				{products
					.filter((product) => product.category == "jewelery")
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
							console.log("jewelry", products);
							return (
								<div key={id} className=" jewelry-details">
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
export default Jewelries;
