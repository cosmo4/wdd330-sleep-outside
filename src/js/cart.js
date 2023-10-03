import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
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

document.addEventListener("DOMContentLoaded", function() {
 
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];


  const cartFooter = document.querySelector('.cart-footer');


  if (cartItems.length > 0) {
      cartFooter.classList.remove('hide');

     
      const total = calculateTotal(cartItems);

      
      const totalHTML = `<span>$${total.toFixed(2)}</span>`;

      
      const cartTotalElement = cartFooter.querySelector('.cart-total');
      cartTotalElement.innerHTML += totalHTML;
  }
});


function calculateTotal(cartItems) {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price;
  }
  return total;
}






















