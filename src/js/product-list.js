import { renderHeaderFooter, getParam} from './utils.mjs';
import { getProductsByCategory } from './externalServices.mjs';
import ProductList from './components/ProductList.svelte';

renderHeaderFooter();
const category = getParam('category')

new ProductList({
    target: document.querySelector('.products'),
    props: { category: category },
});


