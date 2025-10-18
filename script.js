// Global state for current month's expenses
let expenses = [];

// Get current month string for localStorage key (e.g., '2023-10')
const getCurrentMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
};

const defaultTrendData = [
  { "month": "2025-08", "total": 1500},
  { "month": "2025-09", "total": 1250},
  { "month": "2025-10", "total": 1700}
];

// --- DOM Elements ---
const expenseForm = document.getElementById('expense-form');
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalExpensesDisplay = document.getElementById('total-expenses');
const trendChartDiv = document.getElementById('trend-chart');
const clearDataBtn = document.getElementById('clear-data-btn');

// --- Functions ---

function loadExpenses() {
    const monthKey = getCurrentMonthKey();
    const storedExpenses = localStorage.getItem(`expenses_${monthKey}`);
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
    } else {
        expenses = [];
    }
    renderExpenses();
}

function saveExpenses() {
    const monthKey = getCurrentMonthKey();
    localStorage.setItem(`expenses_${monthKey}`, JSON.stringify(expenses));
    renderExpenses(); // Re-render to update total
}

function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <button data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });
    totalExpensesDisplay.textContent = total.toFixed(2);
}

function addExpense(description, amount) {
    if (description && amount > 0) {
        expenses.push({ description, amount });
        saveExpenses();
        expenseDescriptionInput.value = '';
        expenseAmountInput.value = '';
    } else {
        alert('Please enter a valid description and amount.');
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
}

function loadTrendData() {
    const storedTrendData = localStorage.getItem('previous_totals');
    if (storedTrendData) {
        try {
            return JSON.parse(storedTrendData);
        } catch (e) {
            console.error("Error parsing stored trend data, using default.", e);
            return defaultTrendData;
        }
    }
    // If no stored data, initialize with default and save it for future loads
    localStorage.setItem('previous_totals', JSON.stringify(defaultTrendData));
    return defaultTrendData;
}

function renderTrendChart(data) {
    trendChartDiv.innerHTML = ''; // Clear previous chart
    if (!data || data.length === 0) {
        trendChartDiv.textContent = 'No trend data available.';
        return;
    }

    const maxTotal = Math.max(...data.map(d => d.total));
    const chartHeight = 200; // Max height for bars in pixels

    data.forEach(item => {
        const barContainer = document.createElement('div');
        barContainer.classList.add('trend-bar-container');

        const bar = document.createElement('div');
        bar.classList.add('trend-bar');
        const barHeight = (item.total / maxTotal) * chartHeight;
        bar.style.height = `${Math.max(barHeight, 5)}px`; // Ensure min height for visibility
        bar.style.width = '60px'; // Fixed width for bars

        const monthLabel = document.createElement('div');
        monthLabel.classList.add('trend-label');
        // Extract month name for display, e.g., "Aug" from "2025-08"
        const date = new Date(item.month + '-01T12:00:00'); // Add day and time to avoid timezone issues
        monthLabel.textContent = `${date.toLocaleString('default', { month: 'short' })}: $${item.total}`;

        barContainer.appendChild(bar);
        barContainer.appendChild(monthLabel);
        trendChartDiv.appendChild(barContainer);
    });
}

function clearCurrentMonthExpenses() {
    const monthKey = getCurrentMonthKey();
    localStorage.removeItem(`expenses_${monthKey}`);
    expenses = []; // Clear in-memory array
    renderExpenses(); // Re-render to show empty list and 0 total
    alert(`All expenses for ${monthKey} have been deleted.`);
}

// --- Event Listeners ---
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = expenseDescriptionInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    addExpense(description, amount);
});

expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.index) {
        deleteExpense(parseInt(e.target.dataset.index));
    }
});

clearDataBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all expenses for the current month? This action cannot be undone.')) {
        clearCurrentMonthExpenses();
    }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadExpenses(); // Load and display current month's expenses
    const trendData = loadTrendData(); // Load trend data (from LS or default)
    renderTrendChart(trendData); // Render the trend chart
});