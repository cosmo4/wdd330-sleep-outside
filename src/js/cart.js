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

renderCartContents();

document.addEventListener('DOMContentLoaded', function() {
 
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const cartFooter = document.querySelector('.cart-footer');

  if (cartItems.products.length > 0) {
      cartFooter.classList.remove('hide');

     
      const total = calculateTotal(cartItems.products);

      
      const totalHTML = `<span>$${total.toFixed(2)}</span>`;

      
      const cartTotalElement = cartFooter.querySelector('.cart-total');
      cartTotalElement.innerHTML += totalHTML;
  }
});

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const product = cartItems[i];
    if (product.products && Array.isArray(product.products)) {
      total += calculateTotal(product.products);
    } else if (typeof product.FinalPrice === 'number') {
      total += product.FinalPrice;
    } else if (typeof product.FinalPrice === 'string') {
      total += parseFloat(product.FinalPrice);
    }
  }
  return total;
}

function cartItemTemplate(item) {
  const newItem = 
  `<div class="cart-card-container">
    <li class="cart-card divider">
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
    </li>
    <img class="delete-icon" src="/images/delete-bin-line.svg" alt="remove product"></img>
  </div>`;

  return newItem;
}






























