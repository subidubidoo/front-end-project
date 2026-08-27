const navLinks = document.getElementById("navLinks");

const isLoggedIn = localStorage.getItem("isLoggedIn");


if (isLoggedIn === "true") {



    navLinks.innerHTML = `
        <a href="home.html">Home</a>
        <a href="products.html">Products</a>
        <a href="cart.html">
            <i class="fa-solid fa-bag-shopping"></i>
            Cart
        </a>
        <a href="profile.html">
            <i class="fa-regular fa-user"></i>
            Profile
        </a>
        <a href="#" onclick="logout()">Logout</a>
    `;

} else {

    // BEFORE LOGIN

    navLinks.innerHTML = `
        <a href="home.html">Home</a>
        <a href="products.html">Products</a>
        <a href="login.html">Sign In</a>
        <a href="signup.html" class="signup">Sign Up</a>
    `;
}


function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "home.html";

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