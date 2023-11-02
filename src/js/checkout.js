import { renderHeaderFooter } from './utils.mjs';
import CheckoutForm from './components/CheckoutForm.svelte';
import { updateSuperscript } from './productDetails.mjs';
import { getLocalStorage } from './utils.mjs';


new CheckoutForm({
    target: document.querySelector('.checkout-form'),
    // props: totalItems,
})
renderHeaderFooter();
updateSuperscript();