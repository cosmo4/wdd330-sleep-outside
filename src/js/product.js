import { getParam } from './utils.mjs';
import productDetails, { updateSuperscript } from './productDetails.mjs';
import { renderHeaderFooter } from './utils.mjs';

const productId = getParam('product');
productDetails(productId, '.product-detail');

renderHeaderFooter();
updateSuperscript();

