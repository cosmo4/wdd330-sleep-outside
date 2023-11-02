<script>
    let tax = 0;
    let cartCount = 0;
    let subtotal = 0;
    let calculatedTotal = 0;
    function handleSubmit(){

    }
    
</script>

<form name="checkout" on:submit|preventDefault={handleSubmit}>
    <fieldset>
        <legend>Shipping</legend>
        <div class="shipping-info-form">
            <label for="fname">First Name:</label>
            <input type="text" name="fname" required>

            <label for="lname">Last Name:</label>
            <input type="text" name="lname" required>

            <label for="street">Street:</label>
            <input type="text" name="street" required>

            <label for="city">City:</label>
            <input type="text" name="city" required>

            <label for="state">State:</label>
            <input type="text" name="state" required>

            <label for="zip">Zip:</label>
            <input type="text" name="zip" required>
        </div>
    </fieldset>
    <fieldset>
        <legend>Payment</legend>
        <div class="payment-info-form">
            <label for="cardNumber">Card Number:</label>
            <input name="cardNumber" required maxlength="16" minlength="16" placeholder="No dashes or spaces!">

            <label for="expiration">Expiration:</label>
            <input name="expiration" required placeholder="mm/yy">

            <label for="code">Security Code:</label>
            <input name="code" required placeholder="xxx" maxlength="3" minlength="3">
        </div>
    </fieldset>
    <fieldset class="checkout-summary">
        <legend>Order Summary</legend>
        <p>Item Subtotal({ cartCount })<span class="subtotal">{ subtotal }</span></p>
        <p>Shipping Estimate<span class="shippingEst"></span></p>
        <p>Tax <span class="tax">${ tax }</span></p>
        <p><b>Order Total</b><span class="order-total">${ calculatedTotal }</span></p>
    </fieldset>

    <button type="submit" id="checkout-button">Checkout</button>
</form>

