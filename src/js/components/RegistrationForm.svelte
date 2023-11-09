<script>
let fname= '';
let lname= '';
let street= '';
let city= '';
let state = '';
let zip = '';
let email = '';

function handleSubmit(event) {
    event.preventDefault();

    const userData = { fname, lname, street, city, state, zip, email };

    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '../index.html';
        } else {
          console.error('Registration failed.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

</script>

<form name="registration" on:submit|preventDefault={handleSubmit}>
    <fieldset>
        <legend>Register with us</legend>
        <div class="user-info">
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

            <label for="email">email</label>
            <input type="text" name="email" required>
        </div>
    </fieldset>
    <button type="submit" id="register-button">Register</button>
</form>