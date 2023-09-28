import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs"

let productDataStorage = {}

export default async function productDetails(productId, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // add a listener to Add to Cart button

    // Add to cart functions
    const product = await findProductById(productId);

    let cart = getLocalStorage("cart") || { products: [] };

    function addProductToCart(product) {
        cart.products.push(product);
        setLocalStorage("cart", cart);
    }

    async function addToCartHandler(e) {
        
        addProductToCart(product);
    }

    // function displayProduct(item) {
    //     const el = document.querySelector(selector);
    //     const html = item.map(productDetailsTemplate);
    //     el.insertAdjacentHTML('afterbegin', html.join(''))
    // }

    // displayProduct(product)
    

    document
        .getElementById("addToCart")
        .addEventListener("click", addToCartHandler);
}

function productDetailsTemplate(product) {
    return `${product.Name}`;
}




