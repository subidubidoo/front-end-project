
  // Color selection
  document.querySelectorAll('.color-option').forEach(function(el) {
    el.addEventListener('click', function() {
      document.querySelectorAll('.color-option').forEach(function(c) {
        c.classList.remove('selected');
      });
      el.classList.add('selected');
    });
  });

  // Size selection
  document.querySelectorAll('.size-option').forEach(function(el) {
    el.addEventListener('click', function() {
      document.querySelectorAll('.size-option').forEach(function(s) {
        s.classList.remove('selected');
      });
      el.classList.add('selected');
    });
  });

  // Add to cart
  document.getElementById('addToCartBtn').addEventListener('click', function() {
    alert('Added to cart!');
  });


 

