import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { doc } from "prettier";
import { cartCount } from "./stores.mjs";


let productDataStorage = {};

let products = []

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  const product = await findProductById(productId);

  // once we have the product details we can render out the HTML
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));

  // we need the title of the page to match the name of the product
  document.title = `Sleep Outside | ${product.Name}`;

  // add a listener to Add to Cart button

  let cart = getLocalStorage("cart") || { products: [] };

  function addProductToCart(product) {
    const cartItems = cart.products;
    const existingItemIndex = cartItems.findIndex(item => item.Id === product.Id);
  
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].Quantity += 1;
    } else {
      product.Quantity = 1;
      cartItems.push(product);
    }
  
    setLocalStorage("cart", cart);
    cartCount.set(cartItems.length);
    const superscript = document.querySelector('.superscript');
    if (cart.products.length > 0) {
      superscript.classList.remove('hidden');
    }
  }
  
  

  // updateSuperscript()

  async function addToCartHandler(e) {
    addProductToCart(product);
    updateSuperscript();
    
  }

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

export function updateSuperscript() {
  const cart = getLocalStorage('cart') || { products: [] };
  const superscript = document.querySelector('.superscript');

  const totalItems = cart.products.reduce((total, item) => total + item.Quantity, 0);

  if (totalItems > 0) {
    superscript.textContent = totalItems;
    superscript.classList.remove('hidden');
  } else {
    superscript.textContent = '';
    superscript.classList.add('hidden');
  }
}

// sorting start
document.addEventListener('DOMContentLoaded', async function () {
  const sortProductsDropdown = document.getElementById('sortProducts');
  await fetchProductsFromAPI();

  sortProductsDropdown.addEventListener('change', function () {
    const selectedOption = sortProductsDropdown.value;

    if (selectedOption === 'nameAscending') {
      const sortedProducts = sortByNameAscending(products);
      displaySortedProducts(sortedProducts);
    } else if (selectedOption === 'nameDescending') {
      const sortedProducts = sortByNameDescending(products);
      displaySortedProducts(sortedProducts);
    } else if (selectedOption === 'priceAscending') {
      const sortedProducts = sortByPriceAscending(products);
      displaySortedProducts(sortedProducts);
    } else if (selectedOption === 'priceDescending') {
      const sortedProducts = sortByPriceDescending(products);
      displaySortedProducts(sortedProducts);
    }
  });
});

function sortByNameAscending(products) {
return products.slice().sort((a, b) => a.Name.localeCompare(b.Name));
}

function sortByNameDescending(products) {
return products.slice().sort((a, b) => b.Name.localeCompare(a.Name));
}

async function fetchProductsFromAPI() {
  try {
    const categories = ['category1', 'category2', 'category3']; 

    const productsData = await Promise.all(
      categories.map(async (category) => {
        const data = await getData(category);
        return data;
      })
    );

    products = productsData.flat();

    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


function displayProducts(products) {
}

function displaySortedProducts(sortedProducts) {
}
//sorting end

// product comments start



function productDetailsTemplate(product) {
  // The ColorName can only be accessed by specifying which item in the
  // array Colors you want to look in. This is in case there is more than one item
  const htmlTemplate = `<h3 id="productName">${product.Name}</h3>

    <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>

    <img
      id="productImage"
      class="divider"
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />

    <p class="product-card__price" id="productFinalPrice">$${product.FinalPrice}</p>

    <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

    <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
      <button title="Add item to cart" id="addToCart" data-id="">Add to Cart</button>
    </div>`;
  return htmlTemplate;
}

