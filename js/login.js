const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const emailError = document.getElementById("loginEmailError");
    const passwordError = document.getElementById("loginPasswordError");

    if (emailError) {
        emailError.textContent = "";
    }

    if (passwordError) {
        passwordError.textContent = "";
    }


    if (email === "") {

        if (emailError) {
            emailError.textContent = "Please enter your email";
        }

        return;
    }


    if (password === "") {

        if (passwordError) {
            passwordError.textContent = "Please enter your password";
        }

        return;
    }
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html"; 

    localStorage.setItem("loggedInUser", email);


    Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "You have signed in successfully",
        confirmButtonText: "Continue"
    }).then(() => {

        window.location.href = "home.html";

    });

});