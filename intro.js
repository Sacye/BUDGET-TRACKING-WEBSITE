document.addEventListener("DOMContentLoaded", function () {
  loadRecentExpenses();
});

function loadRecentExpenses() {
  const expenseData = JSON.parse(localStorage.getItem("expenseData")) || {};
  const recentExpensesList = document.getElementById("recentExpensesList");

  const sortedTimestamps = Object.keys(expenseData).sort((a, b) => new Date(b) - new Date(a));
  const recentExpenses = sortedTimestamps.slice(0, 3);

  recentExpenses.forEach((timestamp) => {
    const { name, amount } = expenseData[timestamp];
    const listItem = document.createElement("li");
    listItem.innerHTML = `${name} - ₱${amount.toLocaleString()} <span class="date">${new Date(timestamp).toLocaleDateString()}</span>`;
    recentExpensesList.appendChild(listItem);
  });
}
