import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchProducts, userInfo } from "./api";
import {
	Navbar,
	Home,
	Register,
	Products,
	Cart,
	Login,
	Mens,
	Womens,
	Kids,
	Accessories,
	ShopAll,
} from "./Components";

function App() {
	const [cartIsEmpty] = useState(false);
	const [token, setToken] = useState("");
	const [userdata, setUserdata] = useState(null);
	const [products, setProducts] = useState([]);

	const fetchUser = async () => {
		try {
			const IsToken = localStorage.getItem("token");
			if (IsToken) {
				setToken(IsToken);
				const response = await userInfo(IsToken);
				setUserdata(response);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// fetchUser();
		try {
			fetchProducts().then((product) => {
				setProducts(product);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className="App">
			<Navbar
				userdata={userdata}
				setToken={setToken}
				setUserdata={setUserdata}
			/>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route
					path="/products"
					element={<Products setProducts={setProducts} products={products} />}
				>
					<Route
						index
						element={<ShopAll setProducts={setProducts} products={products} />}
					/>
					<Route
						path="mens"
						element={<Mens setProducts={setProducts} products={products} />}
					/>

					<Route
						path="womens"
						element={<Womens setProducts={setProducts} products={products} />}
					/>

					<Route
						path="kids"
						element={<Kids setProducts={setProducts} products={products} />}
					/>

					{/* <Route
						path="jewelries"
						element={
							<Jewelries setProducts={setProducts} products={products} />
						}
					/> */}

					<Route
						path="accessories"
						element={
							<Accessories setProducts={setProducts} products={products} />
						}
					/>
				</Route>

				<Route path="/register" element={<Register setToken={setToken} />} />

				<Route
					path="/login"
					element={<Login setToken={setToken} setUserdata={setUserdata} />}
				/>

				<Route
					path="/cart"
					element={cartIsEmpty ? <Navigate to="/products" /> : <Cart />}
				/>
			</Routes>
		</div>
	);
}

export default App;
