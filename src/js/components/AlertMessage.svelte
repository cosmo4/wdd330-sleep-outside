<script>
    export let message;
  </script>
  
  <div class="alert">
    <p>{message}</p>
  </div>
  
  <style>
    .alert {
      display: block;
      margin: 20px 0;
      background-color: #f0a868;
      color: #fff;
      padding: 1rem;
      text-align: center;
      z-index: 9999;
    }
  </style>