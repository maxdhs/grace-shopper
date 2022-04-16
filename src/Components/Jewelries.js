import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jewelries = ({ setProducts, products }) => {
	const history = useNavigate();
	return (
		<>
			<h4>All Fine Jewelry</h4>
			<div>
				{products
					.filter((product) => product.category == "jewelery")
					.map(({ description, inventory, price, id, title, imgURL }) => {
						console.log("jewelry", products);
						return (
							<div key={id} className=" jewelry-details">
								<p> {title}</p>

								<p>{description} </p>

								<p>
									<span className="price">Price: ${price}</span>
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
export default Jewelries;
