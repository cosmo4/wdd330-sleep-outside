const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
<<<<<<< HEAD
  const products = await getData(response);
  return products.find((item) => item.Id === id);
=======
  const products = await convertToJson(response);
  return products.Result;
>>>>>>> e6a342d62d2fc5c4a3acc4b28c7fc784a1998fac
}
