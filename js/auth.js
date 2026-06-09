function setError(input, errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
    }

    if (input) {
        input.classList.toggle("input-error", Boolean(message));
    }
}

function clearRegisterErrors(fields) {
    setError(fields.name, document.getElementById("name-error"), "");
    setError(fields.email, document.getElementById("email-error"), "");
    setError(fields.password, document.getElementById("password-error"), "");
    setError(fields.dob, document.getElementById("dob-error"), "");
    setError(null, document.getElementById("gender-error"), "");
}

function clearLoginErrors(fields) {
    setError(fields.email, document.getElementById("login-email-error"), "");
    setError(fields.password, document.getElementById("login-password-error"), "");
}

function getSelectedGender() {
    return document.querySelector("input[name='gender']:checked");
}

function validateRegister() {
    const fields = {
        name: document.getElementById("register-name"),
        email: document.getElementById("register-email"),
        password: document.getElementById("register-password"),
        dob: document.getElementById("register-dob")
    };
    const gender = getSelectedGender();
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    let firstInvalidField = null;

    clearRegisterErrors(fields);

    if (!fields.name.value.trim()) {
        setError(fields.name, document.getElementById("name-error"), "Name cannot be empty.");
        firstInvalidField = firstInvalidField || fields.name;
    } else if (fields.name.value.trim().length < 3) {
        setError(fields.name, document.getElementById("name-error"), "Name must be at least 3 characters.");
        firstInvalidField = firstInvalidField || fields.name;
    }

    if (!fields.email.value.trim()) {
        setError(fields.email, document.getElementById("email-error"), "Email cannot be empty.");
        firstInvalidField = firstInvalidField || fields.email;
    } else if (!fields.email.value.includes("@")) {
        setError(fields.email, document.getElementById("email-error"), "Email must contain @.");
        firstInvalidField = firstInvalidField || fields.email;
    }

    if (!fields.password.value) {
        setError(fields.password, document.getElementById("password-error"), "Password cannot be empty.");
        firstInvalidField = firstInvalidField || fields.password;
    } else if (!passwordPattern.test(fields.password.value)) {
        setError(
            fields.password,
            document.getElementById("password-error"),
            "Use 8-16 letters and numbers with uppercase, lowercase, and one number."
        );
        firstInvalidField = firstInvalidField || fields.password;
    }

    if (!fields.dob.value) {
        setError(fields.dob, document.getElementById("dob-error"), "Date of birth cannot be empty.");
        firstInvalidField = firstInvalidField || fields.dob;
    }

    if (!gender) {
        setError(null, document.getElementById("gender-error"), "Please select a gender.");
        firstInvalidField = firstInvalidField || document.querySelector("input[name='gender']");
    }

    if (firstInvalidField) {
        firstInvalidField.focus();
        return false;
    }

    return true;
}

function saveUser() {
    const gender = getSelectedGender();
    const user = {
        name: document.getElementById("register-name").value.trim(),
        email: document.getElementById("register-email").value.trim(),
        password: document.getElementById("register-password").value,
        dob: document.getElementById("register-dob").value,
        gender: gender.value
    };

    localStorage.setItem("goodOldBakeryUser", JSON.stringify(user));
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("password", user.password);
    localStorage.setItem("dob", user.dob);
    localStorage.setItem("gender", user.gender);
}

function validateLogin() {
    const fields = {
        email: document.getElementById("login-email"),
        password: document.getElementById("login-password")
    };
    let firstInvalidField = null;

    clearLoginErrors(fields);

    if (!fields.email.value.trim()) {
        setError(fields.email, document.getElementById("login-email-error"), "Email cannot be empty.");
        firstInvalidField = firstInvalidField || fields.email;
    } else if (!fields.email.value.includes("@")) {
        setError(fields.email, document.getElementById("login-email-error"), "Email must contain @.");
        firstInvalidField = firstInvalidField || fields.email;
    }

    if (!fields.password.value) {
        setError(fields.password, document.getElementById("login-password-error"), "Password cannot be empty.");
        firstInvalidField = firstInvalidField || fields.password;
    }

    if (firstInvalidField) {
        firstInvalidField.focus();
        return false;
    }

    return true;
}

function loginUser() {
    const storedUser = JSON.parse(localStorage.getItem("goodOldBakeryUser") || "null");
    const storedEmail = storedUser ? storedUser.email : localStorage.getItem("email");
    const storedPassword = storedUser ? storedUser.password : localStorage.getItem("password");
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (email === storedEmail && password === storedPassword) {
        alert("Login Successful!");
        window.location.href = "products.html";
        return;
    }

    alert("Invalid Email or Password");
}

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    if (registerForm) {
        registerForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!validateRegister()) {
                return;
            }

            saveUser();
            alert("Registration Successful!");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!validateLogin()) {
                return;
            }

            loginUser();
        });
    }
});
