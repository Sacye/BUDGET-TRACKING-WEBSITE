document.addEventListener("DOMContentLoaded", function () {
    initializeBudgetTracker();
});

// Google Sheets Web App URL (Replace this with yours)
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxIOHcPZSELsemL2yC0_v0JN2SFzdTwt5vUFiYanj7F9OaiyKuxKb3kdJHsaB8EPA5hvA/exec";

// Global Variables
let expenseData = {};
let expenseChart = null;

// Function to initialize the budget tracker
function initializeBudgetTracker() {
    loadSavedBudget();
    loadSavedExpenses();

    document.getElementById("setAllowanceButton")?.addEventListener("click", confirmAllowance);
    document.getElementById("addExpenseButton")?.addEventListener("click", addExpense);
    document.getElementById("resetTrackerButton")?.addEventListener("click", resetTracker);
    document.getElementById("proceedToChartButton")?.addEventListener("click", navigateToChart);

    document.getElementById("expenseSection").classList.add("hidden");
    document.getElementById("controlsSection").classList.add("hidden");
}

// Function to confirm and set allowance
function confirmAllowance() {
    const allowanceInput = parseInt(document.getElementById("allowanceInput").value);

    if (!allowanceInput || allowanceInput <= 0) {
        alert("Please enter a valid allowance amount.");
        return;
    }

    if (confirm(`Are you sure you want to set your allowance to ₱${allowanceInput}?`)) {
        setAllowance(allowanceInput);
    }
}

function setAllowance(allowanceInput) {
    updateRemainingSavings(allowanceInput);
    document.getElementById("expenseSection").classList.remove("hidden");

    alert("You successfully applied your allowances, please proceed next.");
}

// Function to update the remaining savings display
function updateRemainingSavings(amount) {
    document.getElementById("remainingSavings").textContent = amount.toLocaleString();
}

// Function to add an expense and send it to Google Sheets
function addExpense() {
    const expenseName = document.getElementById("expenseCategory").value.trim();
    const expenseAmount = parseInt(document.getElementById("expenseAmount").value);

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    let remainingSavings = parseInt(document.getElementById("remainingSavings").textContent.replace(/₱/g, "").replace(/,/g, ""));

    if (expenseAmount > remainingSavings) {
        alert("Expense exceeds your remaining budget!");
        return;
    }

    remainingSavings -= expenseAmount;
    updateRemainingSavings(remainingSavings);

    // Send data to Google Sheets
    fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        body: JSON.stringify({ user: "User123", expenseName, expenseAmount, remainingSavings }),
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.text())
    .then(data => console.log("Expense saved:", data))
    .catch(error => console.error("Error:", error));

    displayExpenses(expenseName, expenseAmount);
}

// Function to display expenses in the UI
function displayExpenses(name, amount) {
    const expenseList = document.getElementById("expenseList");
    const listItem = document.createElement("li");
    listItem.innerHTML = `${name}: ₱${amount.toLocaleString()} 
        <button class="delete-btn" onclick="removeExpense('${name}', ${amount})">❌</button>`;
    expenseList.appendChild(listItem);
}

// Function to remove an expense
function removeExpense(name, amount) {
    let remainingSavings = parseInt(document.getElementById("remainingSavings").textContent.replace(/₱/g, "").replace(/,/g, ""));
    remainingSavings += amount;
    updateRemainingSavings(remainingSavings);

    const expenseList = document.getElementById("expenseList");
    const items = expenseList.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (items[i].innerHTML.includes(name)) {
            expenseList.removeChild(items[i]);
            break;
        }
    }
}

// Function to load saved budget from Google Sheets
function loadSavedBudget() {
    // Fetch budget from Google Sheets (Future Enhancement)
}

// Function to reset the tracker
function resetTracker() {
    if (confirm("Are you sure you want to reset your budget and expenses?")) {
        document.getElementById("remainingSavings").textContent = "₱0";
        document.getElementById("expenseList").innerHTML = "";
        alert("Tracker has been reset.");
    }
}

// Function to navigate to the chart page
function navigateToChart() {
    window.location.href = "Chart.html";
}
