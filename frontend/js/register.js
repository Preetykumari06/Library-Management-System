// const BaseUrl = "https://library-management-system-swlt.onrender.com/api";
const BaseUrl = "http://localhost:4500/api";
const registrationUrl = `${BaseUrl}/auth/register`;

let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let phoneError = document.getElementById("phone-error");
let submitError = document.getElementById("submit-error");

// Validation for name
function validationName() {
    let name = document.getElementById("name").value;
    if (name.length <= 2) {
        nameError.innerHTML = "Name must be at least 3 characters";
        return false;
    }
    nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

// Validation for phone number
function validationPhone() {
    let phone = document.getElementById("phone").value;  // Fixed ID reference
    if (phone.length < 10) {
        phoneError.innerHTML = "Enter a valid phone number (10-15 digits)";
        return false;
    }
    phoneError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

// Validation for email
function validationEmail() {
    let email = document.getElementById("email").value;
    let emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailPattern)) {
        emailError.innerHTML = "Invalid email format";
        return false;
    }
    emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

// Validation for password
function validationPassword() {
    let password = document.getElementById("password").value;
    if (password.length < 5) {
        passwordError.innerHTML = "Password must be at least 5 characters";
        return false;
    }
    passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

// Validation for role selection
function validationRole() {
    let role = document.getElementById("role").value;
    if (!role) {
        submitError.innerHTML = "Please select a role";
        return false;
    }
    submitError.innerHTML = "";
    return true;
}

// Validate all inputs before submission
function validateSubmit() {
    if (!validationName() || !validationEmail() || !validationPhone() || !validationPassword() || !validationRole()) {
        submitError.innerHTML = "Please correct the errors before submitting.";
        return false;
    }
    RegisterUser();
    return true;
}

// Event listener for form submission
document.getElementById("Submit").addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit();
});

// Fetching input values
var username = document.getElementById("name");
var phone = document.getElementById("phone");  
var email = document.getElementById("email");
var password = document.getElementById("password");
var role = document.getElementById("role");

// Register user
function RegisterUser() {
    let newUserObject = {
        "name": username.value,
        "email": email.value,
        "phone": phone.value,
        "password": password.value,
        "role": role.value
    };

    console.log("Registering User:", newUserObject);

    fetch(`${registrationUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserObject)
    })
    .then((res) => res.json())
    .then((data) => {
        Swal.fire({
            title: data.err ? 'Error!' : 'Success!',
            text: data.err ? data.msg : 'Registration successful! You are now part of our Library Management System. Log in to access your account.', 
            icon: data.err ? 'error' : 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (!data.err) {
                redirectToLogin();
            }
        });
    })
    .catch(error => {
        console.error("Registration Error:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    });
}

// Redirect to login page after successful registration
function redirectToLogin() {
    location.href = "./login.html";
}
