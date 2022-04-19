import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopAll = ({ setProducts, products }) => {
	const history = useNavigate();
	return (
		<>
			<h4>Shop All</h4>
			<div>
				{products.map(
					({ description, inventory, price, id, title, imgURL }) => {
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
					}
				)}
			</div>
		</>
	);
};
export default ShopAll;
