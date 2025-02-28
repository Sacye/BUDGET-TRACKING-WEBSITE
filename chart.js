document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

function initializePage() {
  loadChartData();
  checkBudget();
}

function loadChartData() {
  const expenseData = JSON.parse(localStorage.getItem("expenseData"));

  if (!expenseData) {
    alert("No expense data available.");
    return;
  }

  const labels = [];
  const values = [];

  Object.keys(expenseData).forEach((timestamp) => {
    const { name, amount } = expenseData[timestamp];
    labels.push(name);
    values.push(amount);
  });

  const ctx = document.getElementById("expenseChart").getContext("2d");

  if (window.expenseChart && typeof window.expenseChart.destroy === 'function') {
    window.expenseChart.destroy();
  }

  window.expenseChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      }]
    }
  });
}

function getBudget() {
  return localStorage.getItem("budget");
}

function checkBudget() {
  const budget = getBudget();
  if (!budget) {
    alert("No budget set.");
  }
}

function navigateTo(page) {
  window.location.href = page;
}

function goToHome() {
  navigateTo("home.html");
}

function goToSettings() {
  navigateTo("settings.html");
}
