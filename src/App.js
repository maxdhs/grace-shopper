import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchProducts } from "./api";
import {
	Navbar,
	Home,
	Products,
	Cart,
	Register,
	Login,
	Mens,
	Womens,
	Kids,
	Shoes,
	Bags,
} from "./Components";

function App() {
	const [cartIsEmpty] = useState(false);
	const [products, setProducts] = useState([]);
	// const [token, setToken] = useState("");
	// const [userdata, setUserdata] = useState(null);

	useEffect(() => {
		try {
			// setProducts(fetchProducts());
			fetchProducts().then((product) => {
				setProducts(product);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />

				<Route
					path="/products"
					element={<Products setProducts={setProducts} products={products} />}
				>
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

					<Route
						path="shoes"
						element={<Shoes setProducts={setProducts} products={products} />}
					/>

					<Route
						path="bags"
						element={<Bags setProducts={setProducts} products={products} />}
					/>
				</Route>

				<Route path="/register" element={<Register />} />

				<Route path="/login" element={<Login />} />

				<Route
					path="/cart"
					element={cartIsEmpty ? <Navigate to="/products" /> : <Cart />}
				/>
			</Routes>
			{/* <div>
        {products &&
          products.map((product) => {
            return <h1> {product.title}</h1>;
          })}
      </div> */}
		</div>
	);
}

export default App;
