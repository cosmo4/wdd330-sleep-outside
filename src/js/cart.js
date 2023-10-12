import { getLocalStorage } from './utils.mjs';
import { updateSuperscript } from './productDetails.mjs';

function renderCartContents() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || { products: [] };
  const cartContainer = document.querySelector('.product-list');
  cartItems ? updateSuperscript() : null
  if (cartItems.products.length > 0) {
    const htmlItems = cartItems.products.map((item) => cartItemTemplate(item));
    cartContainer.innerHTML = htmlItems.join('');
  } else {
    cartContainer.innerHTML = ''; // Clear the cart container if the cart is empty
  }
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
  const newItem = `
  <div class="cart-card-container">
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
    <img class="delete-icon" src="/images/delete-bin-line.svg" alt="remove product" data-id="${item.Id}">
  </div>`;
  return newItem;
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-icon')) {
    const productId = event.target.getAttribute('data-id');
    console.log('Delete icon clicked for product ID:', productId);
    removeFromLocalStorage(productId);
    renderCartContents();
    updateCartTotal();
  }
});

function removeFromLocalStorage(productId) {

  let cart = JSON.parse(localStorage.getItem('cart')) || { products: [] };

  cart.products = cart.products.filter(item => item.Id !== productId);

 
  localStorage.setItem('cart', JSON.stringify(cart));

  console.log('Item removed from local storage. Updated cart:', cart);

  return cart;
}
function updateCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || { products: [] };
  if (cartItems.products.length > 0) {
    const total = calculateTotal(cartItems.products);
    const cartTotalElement = document.querySelector('.cart-total');
    cartTotalElement.innerHTML = `<span>$${total.toFixed(2)}</span>`;
  } else {
    const cartTotalElement = document.querySelector('.cart-total');
    cartTotalElement.innerHTML = '';
  }
}

































