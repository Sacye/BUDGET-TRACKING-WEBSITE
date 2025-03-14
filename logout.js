function logout() {
  // Clear user data from localStorage
  localStorage.clear();
  // Redirect to home page
  window.location.href = "home.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});