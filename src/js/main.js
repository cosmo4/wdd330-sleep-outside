import ProductList from './components/ProductList.svelte';
import { renderHeaderFooter, showWelcomeModal } from './utils.mjs';
import { updateSuperscript } from './productDetails.mjs';

renderHeaderFooter();
showWelcomeModal();

new ProductList({
    target: document.querySelector('.products'),
    props: { category: 'tents' },
});


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
  
        successMessage.style.display = 'block';
  
        setTimeout(() => {
            newsletterForm.reset();
        }, 2500);
    });
});
