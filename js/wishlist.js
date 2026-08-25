const wishlistContainer =
    document.getElementById("wishlistContainer");

const emptyWishlist =
    document.getElementById("emptyWishlist");


function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];
}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}


function displayWishlist() {

    const wishlist = getWishlist();

    wishlistContainer.innerHTML = "";


    if (wishlist.length === 0) {

        emptyWishlist.style.display = "block";
        wishlistContainer.style.display = "none";

        return;
    }


    emptyWishlist.style.display = "none";
    wishlistContainer.style.display = "grid";


    wishlist.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("wishlist-card");


        card.innerHTML = `

            <button
                class="remove-heart"
                onclick="removeFromWishlist(${product.id})"
            >
                <i class="fa-solid fa-heart"></i>
            </button>


            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="wishlist-info">

                <h3>
                    ${product.name}
                </h3>


                <p class="wishlist-price">
                    $${Number(product.price).toFixed(2)}
                </p>


                <div class="wishlist-actions">

                    <button
                        class="add-cart-btn"
                        onclick="addWishlistToCart(${product.id})"
                    >
                        Add to Cart
                    </button>


                    <a
                        href="productsPage.html"
                        class="view-btn"
                    >
                        View Product
                    </a>

                </div>

            </div>
        `;


        wishlistContainer.appendChild(card);
    });
}


function removeFromWishlist(productId) {

    let wishlist = getWishlist();


    wishlist =
        wishlist.filter(product =>
            product.id !== productId
        );


    saveWishlist(wishlist);


    displayWishlist();
}


function addWishlistToCart(productId) {

    const wishlist = getWishlist();


    const product =
        wishlist.find(product =>
            product.id === productId
        );


    if (!product) {
        return;
    }


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push({

        id: product.id,

        name: product.name,

        price: product.price,

        image: product.image,

        category: product.category,

        size: "Not selected",

        quantity: 1

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        product.name +
        " added to cart!"
    );
}


const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
}


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


displayWishlist();