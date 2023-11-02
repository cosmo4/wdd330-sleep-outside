<script>
    let isOpen = true;
  
    function closeModal() {
      isOpen = false;
    }

    if (document.cookie.indexOf('visited=') == -1) {
        isOpen = true;
        document.cookie = 'visited=true; expires=Sun, 1 Dec 2024 23:59:59 GMT; path=/';
    } else {
        isOpen = false;
    }
  </script>
  
  {#if isOpen}
  <div class="modal-overlay">
    <div class="modal">
      <span class="close-button" on:click={closeModal}>&times;</span>
      <h2>Welcome to Sleep Outside!</h2>
      <p>Register now to enter our 4 season tents giveaway!</p>
      <button class="register-button">Register</button>
    </div>
  </div>
  {/if}
  
  <style>
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }
  
    .modal {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: center;
      position: relative;
    }
  
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  
    .register-button {
      background-color: #f0a868;
      color: black;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .register-button:hover {
      background-color: #f08e39;
    }
  </style>
  