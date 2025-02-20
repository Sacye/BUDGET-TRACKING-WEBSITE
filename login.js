function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Example credentials check (replace with your own logic)
  const storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    alert("Login successful!");
    window.location.href = "intro.html";
  } else {
    alert("Incorrect username or password.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", login);
  }
});
