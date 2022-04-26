const BASE_URL = 'http://localhost:3001/api';
const lstoken = localStorage.getItem('token');

//user
// export const fetchUser = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/user`);
//     const info = await response.json();
//     console.log(info, "hi")
//     return info;
//   } catch (error) {
//     throw error;
//   }
// };
export const fetchUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lstoken}`
      }
    });
    const info = await response.json();
    return info;
  } catch (error) {
    throw error;
  }
};

export const register = async (email, username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await response.json();
    localStorage.setItem('token', info.token);
    return info;
  } catch (error) {
    throw error;
  }
};
//products

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

export const createCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart/create`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lstoken}`,
      },
    });
    const info = response.json();
    return info;
  } catch (error) {
    throw error;
  }
};
export const addToCart = async (
  price,
  productId,
  count,
  imgURL,
  title,
  description
) => {
  try {
    if (!lstoken) {
      const productArr = localStorage.getItem('products');
      if (!productArr) {
        localStorage.setItem(
          'products',
          JSON.stringify([
            { price, productId, count, imgURL, title, description },
          ])
        );
      }
      productArr.push({ price, productId, count, imgURL, title, description });
      localStorage.setItem('products', JSON.stringify(productArr));
      return;
    }
    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lstoken}`,
      },
      body: JSON.stringify({
        price,
        productId,
        count,
      }),
    });
    const info = await response.json();
    console.log(info);
    return info;
  } catch (error) {
    throw error;
  }
};

export const getProductsFromCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lstoken}`,
      },
    });
    const info = await response.json();
    return info.cart;
  } catch (error) {
    throw error;
  }
};

//reviews:

export const fetchReviews = async (id) => {
  try {
      const resp = await fetch(`${BASE_URL}/reviews/${id}`);
      const info = await resp.json();
      return info.productReviews;
  } catch (error) {
      throw error;
  }
};

