document.addEventListener("DOMContentLoaded", function () {
  initializeBudgetTracker();
  // Removed checkSavingsSet function call
});

// Global Variables
let expenseData = JSON.parse(localStorage.getItem("expenseData")) || {};
let expenseChart = null;

function initializeBudgetTracker() {
  loadSavedBudget();
  loadSavedExpenses();

  const setAllowanceButton = document.getElementById("setAllowanceButton");
  const addExpenseButton = document.getElementById("addExpenseButton");
  const resetTrackerButton = document.getElementById("resetTrackerButton");
  const proceedToChartButton = document.getElementById("proceedToChartButton");
  const proceedToSavingsButton = document.getElementById("proceedToSavingsButton"); // New button

  if (setAllowanceButton) {
    setAllowanceButton.addEventListener("click", confirmAllowance);
  }
  if (addExpenseButton) {
    addExpenseButton.addEventListener("click", addExpense);
  }
  if (resetTrackerButton) {
    resetTrackerButton.addEventListener("click", resetTracker);
  }
  if (proceedToChartButton) {
    proceedToChartButton.addEventListener("click", navigateToChart);
  }
  if (proceedToSavingsButton) {
    proceedToSavingsButton.addEventListener("click", navigateToSavings); // New event listener
  }

  // Ensure elements are hidden initially
  document.getElementById("expenseSection").classList.add("hidden");
  document.getElementById("controlsSection").classList.add("hidden");
}

function confirmAllowance() {
  const allowanceInput = parseInt(document.getElementById("allowanceInput").value);
  console.log("Allowance input:", allowanceInput); // Debugging log

  if (!allowanceInput || allowanceInput <= 0) {
    alert("Please enter a valid allowance amount.");
    return;
  }

  if (confirm(`Are you sure you want to set your allowance to ₱${allowanceInput}?`)) {
    setAllowance(allowanceInput);
  }
}

function setAllowance(allowanceInput) {
  localStorage.setItem("monthlyAllowance", allowanceInput);
  localStorage.setItem("remainingSavings", allowanceInput);

  updateRemainingSavings(allowanceInput);
  document.getElementById("expenseSection").classList.remove("hidden");

  alert("You successfully applied your allowances, please proceed next.");
}

function updateRemainingSavings(amount) {
  const remainingSavingsElement = document.getElementById("remainingSavings");
  if (remainingSavingsElement) {
    remainingSavingsElement.textContent = amount.toLocaleString();
  }
}

function addExpense() {
  const expenseName = document.getElementById("expenseCategory").value.trim();
  const expenseAmount = parseInt(document.getElementById("expenseAmount").value);
  let remainingSavings = parseInt(localStorage.getItem("remainingSavings"));

  if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }

  if (isNaN(remainingSavings)) {
    alert("Remaining savings not set. Please set your allowance first.");
    return;
  }

  if (expenseAmount > remainingSavings) {
    alert("Expense exceeds your remaining budget!");
    return;
  }

  remainingSavings -= expenseAmount;
  localStorage.setItem("remainingSavings", remainingSavings);
  updateRemainingSavings(remainingSavings);

  const timestamp = new Date().toISOString();
  expenseData[timestamp] = { name: expenseName, amount: expenseAmount };
  localStorage.setItem("expenseData", JSON.stringify(expenseData));

  displayExpenses();

  document.getElementById("expenseCategory").value = "";
  document.getElementById("expenseAmount").value = "";
}

function displayExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  Object.keys(expenseData).forEach((timestamp) => {
    const { name, amount } = expenseData[timestamp];
    if (name && amount) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${name}: ₱${amount.toLocaleString()} 
            <button class="delete-btn" onclick="removeExpense('${timestamp}')">❌</button>`;
      expenseList.appendChild(listItem);
    }
  });
}

function removeExpense(timestamp) {
  let remainingSavings = parseInt(localStorage.getItem("remainingSavings"));

  if (expenseData[timestamp]) {
    remainingSavings += expenseData[timestamp].amount;
    delete expenseData[timestamp];
  }

  localStorage.setItem("remainingSavings", remainingSavings);
  localStorage.setItem("expenseData", JSON.stringify(expenseData));

  updateRemainingSavings(remainingSavings);
  displayExpenses();
}

function loadSavedBudget() {
  const savedBudget = parseInt(localStorage.getItem("monthlyAllowance"));
  const remainingSavings = parseInt(localStorage.getItem("remainingSavings"));

  if (savedBudget) {
    updateRemainingSavings(remainingSavings);
    document.getElementById("savingsDisplay").classList.remove("hidden");
    document.getElementById("expenseSection").classList.remove("hidden");
    document.getElementById("controlsSection").classList.remove("hidden");
    const monthlyAllowanceDisplay = document.getElementById("monthlyAllowanceDisplay");
    if (monthlyAllowanceDisplay) {
      monthlyAllowanceDisplay.textContent = savedBudget.toLocaleString(); // Display the exact monthly allowance
    }
  } else {
    updateRemainingSavings(0); // Set remaining savings to zero if no budget is saved
  }
}

function loadSavedExpenses() {
  expenseData = JSON.parse(localStorage.getItem("expenseData")) || {};
  if (Object.keys(expenseData).length === 0) {
    updateRemainingSavings(0); // Set remaining savings to zero if no expenses are added
  }
  displayExpenses();
}

function resetTracker() {
  if (confirm("Are you sure you want to reset your budget and expenses?")) {
    localStorage.removeItem("monthlyAllowance");
    localStorage.removeItem("remainingSavings");
    localStorage.removeItem("expenseData");
    expenseData = {};

    updateRemainingSavings(0);
    document.getElementById("expenseList").innerHTML = "";
    document.getElementById("savingsDisplay").classList.add("hidden");
    document.getElementById("expenseSection").classList.add("hidden");
    document.getElementById("controlsSection").classList.add("hidden");

    alert("Tracker has been reset.");
  }
}

function navigateToChart() {
  window.location.href = "Chart.html";
}

function navigateToSavings() {
  window.location.href = "Savings.html"; // New function
}

// Removed checkSavingsSet function