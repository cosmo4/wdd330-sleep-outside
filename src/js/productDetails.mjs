import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs"

let productDataStorage = {}

export default async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    const product = await findProductById(productId);

    // once we have the product details we can render out the HTML
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
    
    // add a listener to Add to Cart button
    

    let cart = getLocalStorage("cart") || { products: [] };

    function addProductToCart(product) {
        cart.products.push(product);
        setLocalStorage("cart", cart);
    }

    async function addToCartHandler(e) {
        
        addProductToCart(product);
    }
    

    document
        .getElementById("addToCart")
        .addEventListener("click", addToCartHandler);
}

function productDetailsTemplate(product) {
    return `${product.Name}`;
}




