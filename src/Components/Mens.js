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
					.map(({ description, inventory, price, id, title, imgURL }) => {
						return (
							<div key={id} className=" mens-details">
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
					})}
			</div>
		</>
	);
};
export default Mens;
