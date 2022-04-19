import { Link, Outlet, useNavigate } from "react-router-dom";

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

				<Link to="accessories" style={linkStyle}>
					ACCESSORIES
				</Link>
			</nav>
			<Outlet />
		</>
	);
};
export default Products;
