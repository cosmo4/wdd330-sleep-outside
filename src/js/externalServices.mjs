import { alertMessage } from './utils.mjs';

/* eslint-disable no-useless-catch */
const baseURL = import.meta.env.VITE_SERVER_URL

function displayAlertMessages(message) {
  for (const key in message) {
    // eslint-disable-next-line no-prototype-builtins
    if (message.hasOwnProperty(key)) {
      alertMessage(message[key]); // Call your alertMessage function for each message
    }
  }
}

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    displayAlertMessages(data);
    throw { name: 'servicesError', message: data };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const products = await convertToJson(response);
  return products.Result;
}

export async function checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + 'checkout/', options).then(convertToJson);
}