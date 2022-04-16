import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { fetchPeoducts } from "../api";

const linkStyle = {
	// color: "white",
	margin: "10px",
	fontSize: "15px",
	display: "inline-block",
	marginRight: ".3em",
	textDecoration: "none",
};

const Products = ({}) => {
	return (
		<>
			<nav className="nav-1">
				<Link to="mens" style={linkStyle}>
					MENS
				</Link>

				<Link to="womens" style={linkStyle}>
					WOMENS
				</Link>

				<Link to="kids" style={linkStyle}>
					KIDS
				</Link>

				<Link to="shoes" style={linkStyle}>
					SHOES
				</Link>

				<Link to="bags" style={linkStyle}>
					BAGS
				</Link>
			</nav>
			<Outlet />
		</>
	);
};
export default Products;
