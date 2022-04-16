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

									<p>
										<span className="price">Price: ${price} </span>
									</p>

									<p>
										<span className="inventory">In Stock: </span>
										{inventory}
									</p>

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
