const BASE_URL = 'http://localhost:3001/api';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const info = await response.json();
    return info.products;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`);
    const info = await response.json();
    console.log(info);
    return info;
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
};

export const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories/${category}`);
    const info = await response.json();
    return info.products;
  } catch (error) {
    throw error;
  }
};
