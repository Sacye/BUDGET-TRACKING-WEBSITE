function initializePage() {
  const budget = getBudget();
  if (!budget) {
    alert("Please set your savings budget first.");
    const budgetInputElement = document.getElementById("budgetInput");
    if (budgetInputElement) {
      budgetInputElement.focus();
    }
  } else {
    displayCurrentBudget(budget);
    const remainingBudgetElement = document.getElementById("remainingBudget");
    if (remainingBudgetElement) {
      remainingBudgetElement.textContent = `Remaining Budget: ₱${budget}`;
    }
    const trackerLinkElement = document.getElementById("trackerLink");
    const chartLinkElement = document.getElementById("chartLink");
    if (trackerLinkElement && chartLinkElement) {
      trackerLinkElement.style.display = "block";
      chartLinkElement.style.display = "block";
    }
  }
}

function setBudget() {
  const budgetInput = document.getElementById("budgetRange").value;
  let budget;

  switch (budgetInput) {
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

  localStorage.setItem("budget", budget);
  console.log(`User's budget range: ${budgetInput}, Budget: ₱${budget}`); // Log the user's input to the console
  alert("Monthly budget set successfully!");
  displayCurrentBudget(budget); // Display the budget immediately
  window.location.href = "Tracker.html"; // Updated navigation
}

function getBudget() {
  return localStorage.getItem("budget");
}

function displayCurrentBudget(budget) {
  const currentBudgetElement = document.getElementById("currentBudget");
  if (currentBudgetElement) {
    currentBudgetElement.textContent = budget.toLocaleString(); // Only display the budget number
  }
}

function updateBudget() {
  const newBudget = prompt("Enter new budget amount (₱):");
  if (newBudget && newBudget > 0) {
    localStorage.setItem("budget", newBudget);
    console.log(`User's updated budget: ₱${newBudget}`); // Log the user's input to the console
    alert("Budget updated successfully!");
    displayCurrentBudget(newBudget);
    const remainingBudgetElement = document.getElementById("remainingBudget");
    if (remainingBudgetElement) {
      remainingBudgetElement.textContent = `Remaining Budget: ₱${newBudget}`;
    }
  } else {
    alert("Please enter a valid budget amount.");
  }
}

function navigateTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("budgetRange").addEventListener("change", function () {
    if (this.value === "2000+") {
      document.getElementById("customBudgetContainer").style.display = "block";
    } else {
      document.getElementById("customBudgetContainer").style.display = "none";
    }
  });
  initializePage();
  document.getElementById("setSavingsButton").addEventListener("click", setBudget);
});