// Show Login Form
 function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginTab').classList.add('active');
  document.getElementById('signupTab').classList.remove('active');
}

// Show Signup Form
function showSignup() {
  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupTab').classList.add('active');
  document.getElementById('loginTab').classList.remove('active');
}

// Toggle password visibility with a rotating eye icon animation
function togglePassword(inputId, icon) {
  const inputField = document.getElementById(inputId);
  if (inputField.type === "password") {
    inputField.type = "text";
    icon.classList.add("open");
  } else {
    inputField.type = "password";
    icon.classList.remove("open");
  }
}

// Function to handle user login
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const storedUser = JSON.parse(localStorage.getItem(username));
  
  if (storedUser && storedUser.password === password) {
    alert('Login successful!');
    window.location.href = 'intro.html'; // Redirect after login
  } else {
    alert('Invalid username or password!');
  }
}

// Function to handle user signup
function signupUser(event) {
  event.preventDefault();
  const username = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  const userData = {
    username: username,
    password: password
  };
  
  // Check if the user already exists
  if (localStorage.getItem(username)) {
    alert('User already exists!');
    return;
  }
  
  localStorage.setItem(username, JSON.stringify(userData));
  alert('Signup successful! You can now log in.');
  showLogin();  // Switch to login form after successful signup
}

// Ensure the signup form is displayed correctly
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", loginUser);
  }
  const signupButton = document.getElementById("signupButton");
  if (signupButton) {
    signupButton.addEventListener("click", signupUser);
  }
});