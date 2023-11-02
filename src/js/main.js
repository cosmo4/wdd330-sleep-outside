import ProductList from './components/ProductList.svelte'
import { renderHeaderFooter } from './utils.mjs';
import { updateSuperscript } from './productDetails.mjs';
renderHeaderFooter();
new ProductList({
    target: document.querySelector('.products'),
    props: { category: 'tents' },
});

console.log("Test Netlify main.js linking");

document.addEventListener('DOMContentLoaded', function () {
    const superscript = document.querySelector('.superscript');
    const cartData = localStorage.getItem('cart');
    const cart = cartData ? JSON.parse(cartData) : null;
    if (cart) {
        const cartQuantity = cart.products.length;
        superscript.classList.remove('hidden');
        if (superscript) {
            superscript.textContent = `${cartQuantity}`;
        }
    }
updateSuperscript();
    
});

document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('success-message');
  
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const emailInput = newsletterForm.querySelector('input[name="email"]').value;
  
      // Here, you can perform additional validation of the email address if needed.
  
      // Display the success message.
      successMessage.style.display = 'block';
  
      // Refresh the form after a delay (1.5 seconds in this example).
      setTimeout(() => {
        newsletterForm.reset();
      }, 2500);
    });
  });
  
  