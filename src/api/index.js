export const BASE_URL = "http://localhost:3001/api";

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const info = await response.json();
        return info.products;
    } catch (error) {
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const info = await response.json();
        return info.product;
    } catch (error) {
        throw error;
    }
}

export const fetchProductByCategory = async(category) => {
    try {
        const response = await fetch(`${BASE_URL}/products/categories/${category}`);
        const info = await response.json();
        return info.products;
    } catch (error) {
        throw error;
    }
};

export const fetchUser = async () => {
    try {
        const lstoken = localStorage.getItem("token");
        if (lstoken) {
            setToken(lstoken);
        }
        const resp = await fetch(`${BASE_URL}/user/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${lstoken}`,
            },
        });
        const info = await resp.json();
        return info;
    } catch (error) {
        throw error;
    }
};

//Reviews:

export const fetchReviews = async (id) => {
    try {
        const resp = await fetch(`${BASE_URL}/reviews/${id}`);
        const info = await resp.json();
        console.log(info);
        return info.productReviews;
    } catch (error) {
        throw error;
    }
};