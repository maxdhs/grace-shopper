const BASE_URL = 'http://localhost:3001/api';

<<<<<<< HEAD
const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const info = await response.json();
    return info.products;
  } catch (error) {
    console.error(`Error retrieving products ${error}`);
  }
=======
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const info = await response.json();
        return info.products;
    } catch (error) {
        throw error;
    }
>>>>>>> 804d18e96e0367dbb5b5def013a18f3e49e5c173
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
}