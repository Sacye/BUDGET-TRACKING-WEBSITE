document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

function initializePage() {
  loadChartData();
  checkBudget();
}

function loadChartData() {
  const expenseData = JSON.parse(localStorage.getItem("expenseData"));

  if (!expenseData || Object.keys(expenseData).length === 0) {
    alert("No chart data available.");
    return;
  }

  const labels = [];
  const values = [];
  for (const key in expenseData) {
    if (expenseData.hasOwnProperty(key)) {
      labels.push(expenseData[key].name);
      values.push(expenseData[key].amount);
    }
  }

  const ctx = document.getElementById("expenseChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      }]
    }
  });

  displayExpensePercentages(labels, values);
}

function displayExpensePercentages(labels, values) {
  const total = values.reduce((sum, value) => sum + value, 0);
  const percentages = values.map(value => ((value / total) * 100).toFixed(2));
  const expenseList = document.getElementById("expensePercentages");

  expenseList.innerHTML = "";
  const maxIndex = values.indexOf(Math.max(...values));
  labels.forEach((label, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${label}: ${percentages[index]}%`;
    if (index === maxIndex) {
      listItem.classList.add('expensive');
    }
    expenseList.appendChild(listItem);
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
  navigateTo("intro.html");
}

function goToSettings() {
  navigateTo("settings.html");
}