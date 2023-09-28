import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let cart = getLocalStorage("cart") || { products: [] };

function addProductToCart(product) {
  cart.products.push(product);

  setLocalStorage("cart", cart);
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
