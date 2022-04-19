export const BASE_URL = "http://localhost:3001/api";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const info = await response.json();
    console.log(info.products);
    setO = Products(info.products);
    return info;
  } catch (error) {
    console.error(`Error retrieving products ${error}`);
  }
};
