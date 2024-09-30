<script>
  import { getProductsByCategory } from "../externalServices.mjs";
  
  export let category;

  let promise = getProductsByCategory(category);
  </script>
  
  <h2>Top products: {category}</h2>
  {#await promise}
      Loading
  {:then products}
      <ul class="product-list">
          {#each products as product}
              <li class="product-card">
                  <a href="../product_pages/index.html?product={product.Id}">
                      <img src={product.Images.PrimaryMedium} 
                           srcset="{product.Images.PrimaryMedium} 500w, {product.Images.PrimaryLarge}" 
                           alt="Tent"/>
                      <h3 class="card__brand">{product.Brand.Name}</h3>
                      <h2 class="card__name">{product.NameWithoutBrand}</h2>
                      <p class="product-card__price">${product.FinalPrice}</p>
                  </a>
              </li>
          {/each}
      </ul>
  {/await}
  