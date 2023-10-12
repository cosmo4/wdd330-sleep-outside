import ProductList from './components/ProductList.svelte'
import { renderHeaderFooter } from './utils.mjs';
renderHeaderFooter();
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
    
});