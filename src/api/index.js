export const BASE_URL = "http://localhost:3001/api";

export const fetchProducts = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products`);

		const info = await response.json();
		// console.log("info", info.products);
		return info.products;
	} catch (error) {
		console.error(`Error retrieving products ${error}`);
	}
};

export const register = async (email, username, password) => {
	try {
		const response = await fetch(`${BASE_URL}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				username,
				password,
			}),
		});
		const info = await response.json();

		return info;
	} catch (error) {
		console.error(`Error registering a user ${error}`);
	}
};

export const login = async (username, password) => {
	try {
		const response = await fetch(`${BASE_URL}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		const info = await response.json();
		console.log("login_response", info);
		return info;
	} catch (error) {
		console.error(`Error loging in a user ${error}`);
	}
};

export const userInfo = async (token) => {
	try {
		const response = await fetch(`${BASE_URL}/users/me`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const info = await response.json();
		console.log("userInfo", info);
		return info;
	} catch (error) {
		console.error(`Error retrieving user information ${error}`);
	}
};
