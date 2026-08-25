const cartContainer = document.getElementById("cartContainer");
const totalPriceElement = document.getElementById("totalPrice");

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
        total += Number(product.price);

        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>${product.price} JOD</p>
            </div>
            <button class="removeBtn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(item);
    });

    totalPriceElement.textContent = total;
}

cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeBtn")) {
        const index = e.target.dataset.index;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
});

document.getElementById("clearCartBtn").addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
});

renderCart();