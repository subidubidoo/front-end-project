alert("JavaScript connected");

const nameRegex = /^[A-Za-z\s]{2,30}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add("input-error");
}

function clearError(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("input-error");
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
        clearError(confirmPasswordInput, confirmPasswordError);

        let isValid = true;

        if (name === "") {

            showError(
                nameInput,
                nameError,
                "Name is required."
            );

            isValid = false;

        } else if (!nameRegex.test(name)) {

            showError(
                nameInput,
                nameError,
                "Enter a valid name."
            );

            isValid = false;
        }

        if (email === "") {

            showError(
                emailInput,
                emailError,
                "Email is required."
            );

            isValid = false;

        } else if (!emailRegex.test(email)) {

            showError(
                emailInput,
                emailError,
                "Enter a valid email address."
            );

            isValid = false;
        }

        if (password === "") {

            showError(
                passwordInput,
                passwordError,
                "Password is required."
            );

            isValid = false;

        } else if (!passwordRegex.test(password)) {

            showError(
                passwordInput,
                passwordError,
                "Password must be at least 8 characters and include uppercase, lowercase and a number."
            );

            isValid = false;
        }

        if (confirmPassword === "") {

            showError(
                confirmPasswordInput,
                confirmPasswordError,
                "Please confirm your password."
            );

            isValid = false;

        } else if (password !== confirmPassword) {

            showError(
                confirmPasswordInput,
                confirmPasswordError,
                "Passwords do not match."
            );

            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.some(function (user) {
            return user.email === email;
        });

        if (userExists) {

            showError(
                emailInput,
                emailError,
                "This email is already registered."
            );

            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Account created successfully!");

        window.location.href = "login.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");

        const emailError = document.getElementById("loginEmailError");
        const passwordError = document.getElementById("loginPasswordError");

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);

        let isValid = true;

        if (email === "") {

            showError(
                emailInput,
                emailError,
                "Email is required."
            );

            isValid = false;

        } else if (!emailRegex.test(email)) {

            showError(
                emailInput,
                emailError,
                "Enter a valid email address."
            );

            isValid = false;
        }

        if (password === "") {

            showError(
                passwordInput,
                passwordError,
                "Password is required."
            );

            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const currentUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!currentUser) {

            showError(
                passwordInput,
                passwordError,
                "Incorrect email or password."
            );

            return;
        }

        const loggedInUser = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email
        };

        localStorage.setItem(
            "currentUser",
            JSON.stringify(loggedInUser)
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        alert("Signed in successfully!");

        window.location.href = "home.html";
    });
}

function logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
}