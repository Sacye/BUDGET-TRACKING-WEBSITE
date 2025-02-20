function setMonthlyBudget() {
  const budgetRange = document.getElementById("budgetRange").value;
  let budget;

  switch (budgetRange) {
    case "0-500":
      budget = 500;
      break;
    case "501-1000":
      budget = 1000;
      break;
    case "1001-2000":
      budget = 2000;
      break;
    default:
      alert("Please select a valid budget range.");
      return;
  }

  localStorage.setItem("monthlyBudget", budget);
  console.log(`User's budget range: ${budgetRange}, Budget: ₱${budget}`); // Log the user's input to the console
  alert("Monthly budget set successfully!");
  window.location.href = "intro.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const setBudgetButton = document.getElementById("setMonthlyBudgetButton");
  if (setBudgetButton) {
    setBudgetButton.addEventListener("click", setMonthlyBudget);
  }
});
