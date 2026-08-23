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
    image:"images\\T-shirts\\design mens oversized shirt available now! DM me on Instagram anirbaan_xo for link.jpg",
    description:"Sad girl T-shirt for women"},

    {id:3,
    name:"Slit dress",
    price:106,
    category:"Dresses",
    image:"images\\dresses\\download (23).jpg",
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
    description:"pretty bangle set for women"},

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
    description:"pink lolita fashion inspires mary janes"},
    


 ];

 function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = ""; // Clear previous products


    productsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");
        productCard.style.width = "18rem";
        productCard.innerHTML = `
               <img src="${product.image}" class="card-img-top custom-img" style="height: 400px; object-fit:;" alt="${product.name}">
            <div class="card-body h-100">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-price">$${product.price.toFixed(2)}</p>
                <div class="card-btns">
                <button type="button" class="btn btn-sm butt" id="catbtn">Add to Cart</button>
                <button type="button" class="btn btn-sm butt">View Details</button>
                </div
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

        