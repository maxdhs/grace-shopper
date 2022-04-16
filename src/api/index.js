export const BASE_URL = "http://localhost:3001/api";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    const info = await response.json();
    console.log("info", info.products);

    // console.log("info.product", products);
    return info.products;
  } catch (error) {
    console.error(`Error retrieving products ${error}`);
  }
};
