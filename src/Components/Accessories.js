import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accessories = ({ setProducts, products }) => {
	const history = useNavigate();
	const toInclude = ["womens", "mens", "kids"];
	return (
		<>
			<h4>All Accessories</h4>

			<div>
				{products
					.filter((product) => !toInclude.includes(product.category))

					.map(({ description, inventory, price, id, title, imgURL }) => {
						console.log("accessories", products);

						return (
							<div key={id} className=" accessories-details">
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
export default Accessories;
