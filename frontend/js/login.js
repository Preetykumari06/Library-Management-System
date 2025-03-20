// const BaseUrl = "https://library-management-system-swlt.onrender.com/api";
const BaseUrl = "http://localhost:4500/api";
const loginUrl = `${BaseUrl}/auth/login`;

var saveToken = JSON.parse(sessionStorage.getItem("token")) || {};

let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let submitError = document.getElementById("submit-error");

// Validation for email
function validationEmail() {
    let email = document.getElementById("email").value.trim();
    if (!email) {
        emailError.innerHTML = "Email is required";
        return false;
    }
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
    let password = document.getElementById("password").value.trim();
    if (!password) {
        passwordError.innerHTML = "Password is required";
        return false;
    }
    if (password.length < 5) {
        passwordError.innerHTML = "Password must be at least 5 characters";
        return false;
    }
    passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

// Validate form inputs before submission
function validateSubmit() {
    submitError.innerHTML = ""; // Clear previous errors
    if (!validationEmail() || !validationPassword()) {
        submitError.innerHTML = "Please correct the errors before submitting.";
        return false;
    }
    loginUser(); // Call login function if validation passes
    return true;
}

// Event listener for login form submission
document.getElementById("Submit").addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit();
});

// Catching input values
var email = document.getElementById("email");
var password = document.getElementById("password");

// Login user function
function loginUser() {
  let loginUserObject = {
      "email": email.value,
      "password": password.value
  };

  fetch(loginUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserObject)
  })
  .then(res => res.json())
  .then(data => {
      if (data.error) {
          Swal.fire({
              title: "Login Failed",
              text: data.message || "Invalid email or password",
              icon: "error",
              confirmButtonText: "Try Again"
          });
      } else {
          // Store token in sessionStorage
          sessionStorage.setItem("token", JSON.stringify(data.token));

          // Decode JWT token to get the role
          let payload = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT
          let userRole = payload.role; // Extract role

          console.log("User Role:", userRole);

          // Redirect based on role
          Swal.fire({
              title: "Login Successful!",
              text: "Redirecting...",
              icon: "success",
              confirmButtonText: "OK"
          }).then(() => {
              if (userRole === "Admin") {
                  location.href = "../pages/dashboard.html";
              } else if (userRole === "Librarian") {
                  location.href = "../pages/librarian.html";
              } else if (userRole === "Member") {
                  location.href = "../pages/member.html";
              } else {
                  location.href = "../index.html"; // Default redirect
              }
          });
      }
  })
  .catch(error => {
      console.error("Login Error:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
  });
}
