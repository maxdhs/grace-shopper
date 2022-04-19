import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const linkStyle = {
	// color: "white",
	margin: "10px",
	fontSize: "20px",
	display: "inline-block",
	marginRight: "1em",
	textDecoration: "none",
};

const Navbar = ({ userdata, setToken, setUserdata }) => {
	return (
		<>
			<div className="heading">
				<div className="horizontal-nav1">
					<span className="prj-name">Grace Shopper </span>

					<span className="authors"> J. E. C. </span>
				</div>

				<div className="horizontal-nav2">
					<Link to="/" style={linkStyle}>
						HOME
					</Link>

					<Link to="/products" style={linkStyle}>
						SHOP ALL
					</Link>

					<Link to="/cart" style={linkStyle}>
						CART
					</Link>

					{!userdata && (
						<Link to="/register" style={linkStyle}>
							REGISTER
						</Link>
					)}

					{!userdata && (
						<Link to="/login" style={linkStyle}>
							LOGIN
						</Link>
					)}

					{userdata && (
						<Link
							to="/"
							style={linkStyle}
							onClick={() => {
								setToken("");
								setUserdata(null);
								localStorage.removeItem("token");
							}}
						>
							LOG OUT
						</Link>
					)}
				</div>

				<div className="horizontal-nav3">
					{userdata ? <span>Hello {userdata.username} </span> : null}
				</div>
			</div>
		</>
	);
};

export default Navbar;
