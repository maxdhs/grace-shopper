import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Mens = ({ setProducts, products }) => {
	const history = useNavigate();
	return (
		<>
			<h4>All Men's clothing</h4>
			<div>
				{products
					.filter((product) => product.category == "mens")
					.map(({ category, description, inventory, price, id, title }) => {
						return (
							<div key={id} className=" mens-details">
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
export default Mens;
