// const cartContainer = document.getElementById("cartContainer");
// const totalPriceElement = document.getElementById("totalPrice");

// function renderCart() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cartContainer.innerHTML = "";

//     cart.forEach((product, index) => {
//         const item = document.createElement("div");
//         item.classList.add("cart-item");
//         item.innerHTML = `
//             <img src="${product.image}" alt="${product.name}">
//             <div class="cart-item-info">
//                 <h3>${product.name}</h3>
//                 <p>${product.price} JOD</p>
//                 <div class="cart-quantity">
//                     <button class="decrement" data-index="${index}">-</button>
//                     <span class="number">${product.quantity}</span>
//                     <button class="increment" data-index="${index}">+</button>  
//                 </div>
//             </div>
//             <button class="removeBtn" data-index="${index}">Remove</button>
//         `;
//         cartContainer.appendChild(item);
//     });

//     updateTotalPrice();
//     calculateTax();
// }

// function updateTotalPrice() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let total = 0;
//     cart.forEach(product => {
//         total += Number(product.price) * product.quantity;
//     });
//     totalPriceElement.textContent = total.toFixed(2);
// }

// cartContainer.addEventListener("click", (e) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const index = e.target.dataset.index;

//     if (e.target.classList.contains("removeBtn")) {
//         cart.splice(index, 1);
//     }

//     if (e.target.classList.contains("increment")) {
//         cart[index].quantity += 1;
//     }

//     if (e.target.classList.contains("decrement")) {
//         if (cart[index].quantity != 1) {
//              cart[index].quantity -= 1;
//         }
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     renderCart();
// });

// document.getElementById("clearCartBtn").addEventListener("click", () => {
//     localStorage.removeItem("cart");
//     renderCart();
// });

// function calculateTax() {
//      const cart1 = JSON.parse(localStorage.getItem("cart")) || [];
//      const taxElement = document.getElementById("taxPrice");
//     let total2 = 0;
//     cart1.forEach(product => {
//         total2 += Number(product.price) * product.quantity;
//     });
//     let tax = total2 + total2*(0.16);
//     taxElement.textContent= `${tax}`;

// }

// renderCart();






const cartContainer = document.getElementById("cartContainer");
const totalPriceElement = document.getElementById("totalPrice");

function getCurrentUserCart() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (!currentUser) return [];
    return allItems.filter(item => item.userId == currentUser.id);
}

function renderCart() {
    const cart = getCurrentUserCart();                      // ← changed from reading localStorage directly
    cartContainer.innerHTML = "";

    cart.forEach((product, index) => {
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>${product.price} JOD</p>
                <div class="cart-quantity">
                    <button class="decrement" data-index="${index}">-</button>
                    <span class="number">${product.quantity}</span>
                    <button class="increment" data-index="${index}">+</button>  
                </div>
            </div>
            <button class="removeBtn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(item);
    });

    updateTotalPrice();
    calculateTax();
}

function updateTotalPrice() {
    const cart = getCurrentUserCart();                      // ← changed
    let total = 0;
    cart.forEach(product => {
        total += Number(product.price) * product.quantity;
    });
    totalPriceElement.textContent = total.toFixed(2);
}

cartContainer.addEventListener("click", (e) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let allItems = JSON.parse(localStorage.getItem("cart")) || [];   // ← full shared list, not filtered
    const index = e.target.dataset.index;
    const cart = getCurrentUserCart();                              // ← filtered list, matches what's shown
    const clickedProduct = cart[index];
    if (!clickedProduct) return;

    if (e.target.classList.contains("removeBtn")) {
        allItems = allItems.filter(item => !(item.id == clickedProduct.id && item.userId == currentUser.id));
    }

    if (e.target.classList.contains("increment")) {
        const match = allItems.find(item => item.id == clickedProduct.id && item.userId == currentUser.id);
        if (match) match.quantity += 1;
    }

    if (e.target.classList.contains("decrement")) {
        const match = allItems.find(item => item.id == clickedProduct.id && item.userId == currentUser.id);
        if (match && match.quantity != 1) {
            match.quantity -= 1;
        }
    }

    localStorage.setItem("cart", JSON.stringify(allItems));
    renderCart();
});

document.getElementById("clearCartBtn").addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let allItems = JSON.parse(localStorage.getItem("cart")) || [];

            Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#db5d5d",
        cancelButtonColor: "rgb(160, 184, 231)",
        confirmButtonText: "Yes, Clear cart!"
        }).then((result) => {
        if (result.isConfirmed) Swal.fire({
            title: "Deleted!",
            text: "Cart Cleared",
            icon: "success"
        });
        });

    allItems = allItems.filter(item => item.userId != currentUser.id);  // ← only clear THIS user's items
    localStorage.setItem("cart", JSON.stringify(allItems));
    renderCart();
});

function calculateTax() {
    const cart1 = getCurrentUserCart();                     // ← changed
    const taxElement = document.getElementById("taxPrice");
    let total2 = 0;
    cart1.forEach(product => {
        total2 += Number(product.price) * product.quantity;
    });
    let tax = total2 + total2 * 0.16;
    taxElement.textContent = `${tax.toFixed(2)}`;
}

renderCart();


function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1200
    }).then(() => {
        window.location.href = "login.html";
    });
}


document.getElementById("pay-button").addEventListener("click", () => {
    const currentUser1 = JSON.parse(localStorage.getItem("currentUser"));
    let allItems1 = JSON.parse(localStorage.getItem("cart")) || [];

       Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});

    allItems1 = allItems1.filter(item => item.userId != currentUser1.id);  // ← only clear THIS user's items
    localStorage.setItem("cart", JSON.stringify(allItems1));
    renderCart();
});
