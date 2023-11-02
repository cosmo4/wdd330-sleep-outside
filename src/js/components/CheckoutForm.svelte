<script>
  import { checkout } from "../externalServices.mjs";
  import { alertMessage } from "../utils.mjs";

  const cartItems = JSON.parse(localStorage.getItem("cart")) || {
    products: [],
  };
  let tax = 0;
  let subtotal = 0;
  let shipping = 0;
  let orderTotal = 0;
  let cartCount = cartItems.products.length;

  const calculateSubtotal = function (cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const product = cartItems[i];
      if (product.products && Array.isArray(product.products)) {
        total += calculateTotal(product.products);
      } else if (typeof product.FinalPrice === "number") {
        total += product.FinalPrice;
      } else if (typeof product.FinalPrice === "string") {
        total += parseFloat(product.FinalPrice);
      }
    }
    return total;
  };

  subtotal = calculateSubtotal(cartItems.products);

  const calculateOrderTotal = function () {
    tax = Math.floor(subtotal * 0.06 * 100) / 100;
    if (cartCount <= 0) {
      shipping = 0;
    } else if (cartCount === 1) {
      shipping = 10;
    } else {
      shipping = 10 + (cartCount - 1) * 2;
    }
    return subtotal + tax + shipping;
  };
  orderTotal = calculateOrderTotal();

  function packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formElements = form.querySelectorAll("input[name]");

    const formData = {};

    formElements.forEach((element) => {
      formData[element.name] = element.value;
    });

    const orderDate = new Date().toISOString();

    try {
      const formattedData = {
        orderDate,
        fname: formData.fname,
        lname: formData.lname,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        cardNumber: formData.cardNumber,
        expiration: formData.expiration,
        code: formData.code,
        items: packageItems(cartItems.products),
        orderTotal: orderTotal.toFixed(2),
        shipping,
        tax: tax.toFixed(2),
      };

      console.log("Sending data to checkout method:", formattedData);

      checkout(formattedData)
        .then((response) => {
          console.log("Checkout successful:", response);
          window.location.href = 'success.html';
        })
        .catch((error) => {
          console.error("Checkout failed:", error);
        });
    } catch (error) {
      alertMessage(error);
      
    }
  }
</script>

<form name="checkout" on:submit|preventDefault={handleSubmit} id="checkoutForm">
  <fieldset>
    <legend>Shipping</legend>
    <div class="shipping-info-form">
      <label for="fname">First Name:</label>
      <input type="text" name="fname" required />

      <label for="lname">Last Name:</label>
      <input type="text" name="lname" required />

      <label for="street">Street:</label>
      <input type="text" name="street" required />

      <label for="city">City:</label>
      <input type="text" name="city" required />

      <label for="state">State:</label>
      <input type="text" name="state" required />

      <label for="zip">Zip:</label>
      <input type="text" name="zip" required />
    </div>
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <div class="payment-info-form">
      <label for="cardNumber">Card Number:</label>
      <input
        name="cardNumber"
        required
        maxlength="16"
        minlength="16"
        placeholder="No dashes or spaces!"
      />

      <label for="expiration">Expiration:</label>
      <input name="expiration" required placeholder="mm/yy" />

      <label for="code">Security Code:</label>
      <input
        name="code"
        required
        placeholder="xxx"
        maxlength="3"
        minlength="3"
      />
    </div>
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <p>Item Subtotal({cartCount})<span class="subtotal">${subtotal}</span></p>
    <p>Shipping Estimate<span class="shippingEst">${shipping}</span></p>
    <p>Tax <span class="tax">${tax}</span></p>
    <p>
      <b>Order Total</b><span class="order-total">${orderTotal.toFixed(2)}</span
      >
    </p>
  </fieldset>

  <button type="submit" id="checkout-button">Checkout</button>
</form>

<style>

</style>
