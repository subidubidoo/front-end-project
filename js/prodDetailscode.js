

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



document.querySelector("#closing").addEventListener("click", () => {
    window.location.href = "productsPage.html";
});



const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products.find(p => p.id == productId);

if (product) {
    document.querySelector("h1").textContent = product.name;
    document.querySelector(".price").textContent = product.price.toFixed(2) + " JOD";
    document.querySelector(".description").textContent = product.description;
    document.querySelector(".product-image img").src = product.image;

    // store the id on the product-box so the Add to Cart button can find it later
    document.querySelector(".product-box").dataset.id = product.id;
}

document.getElementById("addToCartBtn").addEventListener("click", () => {

    const id = document.querySelector(".product-box").dataset.id;
    addToCart(id); // reuse the same addToCart function from your products page
    
});