import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { doc } from "prettier";

let productDataStorage = {};

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  const product = await findProductById(productId);

  // once we have the product details we can render out the HTML
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));

  // we need the title of the page to match the name of the product
  document.title = `Sleep Outside | ${product.Name}`;

  // add a listener to Add to Cart button

  let cart = getLocalStorage("cart") || { products: [] };

  function addProductToCart(product) {
    cart.products.push(product);
    setLocalStorage("cart", cart);
    
  }

  function updateSuperscript() {
    const superscript = document.querySelector('.superscript');
    superscript.classList.remove('hidden');
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartQuantity = cart ? cart.products.length : 0;
    if (superscript) {
        superscript.textContent = `${cartQuantity}`;
      }
  }
  

  async function addToCartHandler(e) {
    addProductToCart(product);
    updateSuperscript();
  }

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

function productDetailsTemplate(product) {
  // The ColorName can only be accessed by specifying which item in the
  // array Colors you want to look in. This is in case there is more than one item
  const htmlTemplate = `<h3 id="productName">${product.Name}</h3>

    <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>

    <img
      id="productImage"
      class="divider"
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />

    <p class="product-card__price" id="productFinalPrice">$${product.FinalPrice}</p>

    <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

    <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
      <button title="Add item to cart" id="addToCart" data-id="">Add to Cart</button>
    </div>`;
  return htmlTemplate;
}
