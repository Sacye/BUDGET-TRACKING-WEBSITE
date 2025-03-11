document.addEventListener("DOMContentLoaded", function () {
    loadRecentExpenses();
    displayUserName();
});

function loadRecentExpenses() {
    const expenseData = JSON.parse(localStorage.getItem("expenseData")) || {};
    const recentExpensesList = document.getElementById("recentExpensesList");
    
    // Check if the element exists
    if (!recentExpensesList) {
        console.error("Element with ID 'recentExpensesList' not found.");
        return;
    }
    
    // Clear the list before appending new items
    recentExpensesList.innerHTML = '';
    
    const sortedTimestamps = Object.keys(expenseData).sort((a, b) => new Date(b) - new Date(a));
    const recentExpenses = sortedTimestamps.slice(0, 3);
    
    recentExpenses.forEach((timestamp) => {
        const { name, amount } = expenseData[timestamp];
        const listItem = document.createElement("li");
        listItem.classList.add("expense-item"); // Add CSS class for alignment
        listItem.innerHTML = `${name} - ₱${amount.toLocaleString()} <span class="date">${new Date(timestamp).toLocaleDateString()}</span>`;
        recentExpensesList.appendChild(listItem);
    });

    // Add CSS class to the recent expenses box
    recentExpensesList.classList.add("expense-item");
}

function displayUserName() {
    let userName = localStorage.getItem("userName") || "User";
    if (userName.includes(" ")) {
        userName = userName.split(" ")[0]; // Use the first word if the name contains spaces
    } else if (userName.length > 5) {
        userName = userName.substring(0, 5); // Truncate to 4-5 letters if the name is too long
    }
    document.getElementById("user-name").textContent = userName;
}