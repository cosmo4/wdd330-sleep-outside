import { getLocalStorage } from './utils.mjs';
import { updateSuperscript } from './productDetails.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('cart');
  // This calls the updateSuperscript function for the cart page 
  cartItems ? updateSuperscript() : null
  // This maps the array in the obect to display the products.
  const htmlItems = cartItems ? cartItems.products.map((item) => cartItemTemplate(item)) : null;
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
