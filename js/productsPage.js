const products =[
    {id:1,
    name:"Strawberries T-shirt",
    price:18,
    category:"T-shirts",
    image:"images\\T-shirts\\Chic Office Casual_ Strawberry Print Tee.jpg",
    description:"Cute strawberry oversized T-shirt for women"},

    {id:2,
    name:"Girl T-shirt",
    price:25,
    category:"T-shirts",
    image:"images\\T-shirts\\download (21).jpg",
    description:"girls T-shirtwith a cute pink bow for women"},

    {id:3,
    name:"Slit dress",
    price:106,
    category:"Dresses",
    image:"images\\dresses\\dress3.jpg",
    description:"Summer dress for women with a slit and flower designs"},

    {id:4,
    name:"Silk purple dress",
    price:75,
    category:"Dresses",
    image:"images\\dresses\\Silk Satin Party Dress_ Effortless Summer Glow.jpg",
    description:"Short pruple ruffled dress with long sleeves and flower designs"},

    {id:5,
    name:"Flower dress",
    price:84,
    category:"Dresses",
    image:"images\\dresses\\download (22).jpg",
    description:"Beautiful flower maxi sundress with a cute bow"},

    {id:6,
    name:"Red dress",
    price:90,
    category:"Dresses",
    image:"images\\dresses\\download (24).jpg",
    description:"red elegant dress for black tie events"},

    {id:7,
    name:"Sun necklace",
    price:9,
    category:"Jewelry",
    image:"images\\jewelery\\1pc_Set Women's Luxury Romantic Sparkling Pink Floral Sun Zirconia Necklace & Bracelet Set.jpg",
    description:"Colorful Sun and flower necklace and bracelet set for women"},

    {id:8,
    name:"Bangle set",
    price:15,
    category:"Jewelry",
    image:"images\\jewelery\\Bangles.jpg",
    description:"pretty and colorful indian inspired bangle set for women"},

    {id:9,
    name:"Green trendy pants",
    price:34,
    category:"Pants",
    image:"images\\pants\\Another Green Pair Of Patchwork Pants.jpg",
    description:"Beautiful green trendy pants with a cute bow"},

    {id:10,
    name:"starry pants",
    price:42,
    category:"Pants",
    image:"images\\pants\\Women Blue Y2k Baggy Embroidery Star Jeans Harajuku Vintage Denim Trouser Japanese 2000s Style Jeans.jpg",
    description:"baggy colorful starry pants for women"},

    {id:11,
    name:"converse shoes",
    price:22,
    category:"Shoes",
    image:"images\\shoes\\download (25).jpg",
    description:"Black converse shoes for everyday wear"},

    {id:12,
    name:"cute mary janes",
    price:60,
    category:"Shoes",
    image:"images\\shoes\\Lace Ankle Socks.jpg",
    description:"pink lolita fashion inspires mary janes"}
 ];



 function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = ""; // Clear previous products


    productsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");
        productCard.style.width = "18rem";
        productCard.dataset.id = product.id;
        productCard.innerHTML = `
               <img src="${product.image}" class="card-img-top custom-img" style="height: 300px; object-fit:cover;" alt="${product.name}">
            <div class="card-body ">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-price">${product.price.toFixed(2)} JOD</p>
                <div class="card-btns">
                <button type="button" class="btn btn-sm addcart" style="background-color: #563838; font-family:'Montserrat','Playfair Display';color: #fffafa;font-weight:470;font-size: 0.8rem;position:absolute; bottom:16px; right:30px;width:35px;height:35px;display:flex;justify-content:center;align-items:center;">
                <i class="bi bi-bag-heart" style="font-size:1.5rem;"></i>
                </button>
                <button type="button" class="btn btn-sm detailsbtn" style="background-color: #563838; font-family:'Montserrat','Playfair Display';color: #fffafa;font-weight:470;font-size: 0.8rem;position:absolute; bottom:16px; left:20px;">
                <i class="bi bi-balloon-heart"></i> Details</button>
                </div>
                </div>

             `;
        productContainer.appendChild(productCard);
        
    });
}
displayProducts(products);

const categoryButtons = document.querySelectorAll(".cat-btn");
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.value;
        const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        displayProducts(filteredProducts);
    });
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", e => {
    const searchTerm = e.target.value.toLowerCase();
    const searchedProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(searchedProducts);
});

const cartIcon =document.querySelector('#carticon');
    const cart1 =document.querySelector('.cart');
    const cartClose =document.querySelector('#closing');

    cartIcon.addEventListener("click",() => cart1.classList.add("active"));
    cartClose.addEventListener("click",() => cart1.classList.remove("active"));



// function displayCart(cartProducts) {
//     const cartContainer = document.getElementById("cartContainer");
//     cartContainer.innerHTML = "";

//     cartProducts.forEach(product => {
//         const productCard = document.createElement("div");
//         productCard.classList.add("card");
//         productCard.style.width = "18rem";
//         productCard.dataset.id = product.id;
//         productCard.innerHTML = `
//                <img src="${product.image}" class="card-img-top custom-img" style="height: 300px; object-fit:cover;" alt="${product.name}">
//             <div class="card-body ">
//                 <h5 class="card-title">${product.name}</h5>
//                 <p class="card-text">${product.description}</p>
//                 <p class="card-price">${product.price.toFixed(2)} JOD</p>
//             </div>
//              `;
//         cartContainer.appendChild(productCard);
//     });
// }

// let cart = JSON.parse(localStorage.getItem("cart")) || [];
// console.log(JSON.parse(localStorage.getItem("cart")));

// displayCart(cart);

productContainer.addEventListener("click", (e) => {
    if (e.target.closest(".addcart")) {
        const card = e.target.closest(".card");
        const productId = card.dataset.id;
        addToCart(productId);
    }
});



const cartContent = document.querySelector(".cart-content");

// function addToCart(productId) {
//     const product = products.find(p => p.id == productId);
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     for (let item of cart){
//         if (Number(productId) === Number(item.id)){
//             Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Oop Item is already in the cart",
// });
//             return;
//         }
//     }
//     cart.push({...product,quantity:1});
//     localStorage.setItem("cart", JSON.stringify(cart));
//     Swal.fire({
//     title: "Nice!",
//     text: "Added to cart successfully",
//     icon: "success"
//     });

//     renderCart(); // rebuild the visible cart from localStorage
// }





function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        Swal.fire({
            icon: "warning",
            title: "Please sign in first",
            text: "You need to be logged in to add items to your cart."
        });
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for (let item of cart) {
        if (Number(productId) === Number(item.id) && item.userId === currentUser.id) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Oop Item is already in the cart",
            });
            return;
        }
    }

    cart.push({ ...product, quantity: 1, userId: currentUser.id });
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
        title: "Nice!",
        text: "Added to cart successfully",
        icon: "success"
    });

    renderCart();
}







cartContent.addEventListener("click", (e) => {
    if (e.target.closest(".cart-remove")) {
        const cartBox = e.target.closest(".cart-box");
        const productId = cartBox.dataset.id;
        removeFromCart(productId);
    }
});
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(product => product.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


// function renderCart() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cartContent.innerHTML = "";

//     cart.forEach(product => {
//         const cartBox = document.createElement("div");
//         cartBox.classList.add("cart-box");
//         cartBox.dataset.id = product.id;
//         cartBox.innerHTML = `
//          <img src="${product.image}" alt="${product.name}">
//             <div class="cart-detail">
//               <h2 class="cart-product-title">${product.name}</h2>
//               <span class="cart-price">${product.price} JOD</span>
//               <div class="cart-quantity">
//                 <button class="decrement">-</button>
//                 <span class="number">${product.quantity}</span>
//                 <button class="increment">+</button>  
//               </div>
//             </div>
//             <i class="bi bi-trash cart-remove"></i>`;
//         cartContent.appendChild(cartBox);

//         // attach the quantity click listener to THIS specific cartBox
//         cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
//             const numberElement = cartBox.querySelector(".number");
//             let quant = Number(numberElement.textContent);

//             if (event.target.classList.contains("decrement") && quant > 1) {
//                 quant--;
//             } else if (event.target.classList.contains("increment")) {
//                 quant++;
//             }

//             numberElement.textContent = quant;

//             // save the new quantity back to localStorage
//             let cart = JSON.parse(localStorage.getItem("cart")) || [];
//             const item = cart.find(p => p.id == product.id);
//             if (item) {
//                 item.quantity = quant;
//                 localStorage.setItem("cart", JSON.stringify(cart));
//             }
//             updateTotalPrice();
//         });
//     });

//     updateTotalPrice();
// }

// const updateTotalPrice = () => {
//     const totalPriceElement = document.querySelector(".total-price");
//     const cartElement = JSON.parse(localStorage.getItem("cart")) || [];
//     let total = 0;
//     cartElement.forEach(element => {
//         total += Number(element.price)*Number(element.quantity);
//     });
//     totalPriceElement.textContent = `${total} JOD`;
// };


const totalPriceElement = document.querySelector(".total-price")

function getCurrentUserCart() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (!currentUser) return [];
    return allItems.filter(item => item.userId == currentUser.id);
}

function renderCart() {
    const cart = getCurrentUserCart();
    cartContent.innerHTML = "";                                       // ✅ correct container

    cart.forEach(product => {                                         // ✅ dropped "index" — using id-based matching now
        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");                            // ✅ matches your real CSS
        cartBox.dataset.id = product.id;
        cartBox.innerHTML = `
         <img src="${product.image}" alt="${product.name}">
            <div class="cart-detail">
              <h2 class="cart-product-title">${product.name}</h2>
              <span class="cart-price">${product.price} JOD</span>
              <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">${product.quantity}</span>
                <button class="increment">+</button>  
              </div>
            </div>
            <i class="bi bi-trash cart-remove"></i>`;
        cartContent.appendChild(cartBox);                             // ✅ correct container

        // ✅ this whole block was MISSING in your active renderCart — added back in
        cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
            const numberElement = cartBox.querySelector(".number");
            let quant = Number(numberElement.textContent);

            if (event.target.classList.contains("decrement") && quant > 1) {
                quant--;
            } else if (event.target.classList.contains("increment")) {
                quant++;
            }

            numberElement.textContent = quant;

            let allItems = JSON.parse(localStorage.getItem("cart")) || [];
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const item = allItems.find(p => p.id == product.id && p.userId == currentUser.id);
            if (item) {
                item.quantity = quant;
                localStorage.setItem("cart", JSON.stringify(allItems));
            }
            updateTotalPrice();
        });
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    const cart = getCurrentUserCart();   // ← also changed here
    let total = 0;
    cart.forEach(product => {
        total += Number(product.price) * product.quantity;
    });
    totalPriceElement.textContent = total.toFixed(2);
}


// run this once when the page loads, so the cart shows saved items even after reload
renderCart();

function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    renderCart();
}


// on the products page — same pattern as the details button we did earlier
productContainer.addEventListener("click", (e) => {
    if (e.target.closest(".detailsbtn")) {
        const card = e.target.closest(".card");
        const productId = card.dataset.id;
        window.location.href = "prodDetails.html?id=" + productId;
    }
});


function gotoCart() {
        window.location.href = "cartPage.html";
};

// cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
//     const numberElement = cartBox.querySelector(".number");
//     const decrementButton = cartBox.querySelector(".decrement");
//     let quant = Number(numberElement.textContent);
//     if (event.target.classList.contains("decrement") && quant > 1) {
//         quant--;
//         if(quant === 1){
//             decrementButton.style.color="#6f5555"
//         }
//     }
//     else if (event.target.classList.contains("increment")) {
//         quant++;
//         decrementButton.style.color="#402b2b"

//     }

//     numberElement.textContent =quant;
// });


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
    accountLogin();
}


function accountLogin() {
    const logoutButton = document.getElementById("logoutBtn");
    const signinButton = document.getElementById("signinBtn");

    if (localStorage.getItem("isLoggedIn") === null){
        logoutButton.style.display ="none";
    }
    else {
        signinButton.style.display ="none";

    }
    
}
accountLogin();