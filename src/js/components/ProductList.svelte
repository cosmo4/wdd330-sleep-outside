<p>My new product list componenent!</p>


<script>
import { getData } from "../productData.mjs";

// this is how we make a prop in svelte
export let category;
// if you are looking at this thinking that's strange to just stop with a promise
// you would be right.  This will make more sense in a bit...stay tuned.
let promise = getData(category);
</script>


        <h2>Top products: {category}</h2>
        {#await promise}
        Loading
        {:then products}
        <ul class="product-list">
        {#each products as product}
        {#if product.Id !== "989CG" && product.Id !== "880RT"}
          <li class="product-card">
            <a href="product_pages/index.html?product={product.Id}">
              <img
                src= {product.Image}
              />
              <h3 class="card__brand">{product.Brand.Name}</h3>
              <h2 class="card__name">{product.NameWithoutBrand}</h2>
              <p class="product-card__price">${product.FinalPrice}</p></a
            >
          </li>
          {/if}
          {/each}
        </ul>
        {/await}
     