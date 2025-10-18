# Expense Recorder with Trend Analysis

This is a simple single-page web application designed to help you track your monthly expenses and visualize spending trends over the last three months.

## Features

*   **Expense Recording:** Easily add new expenses with a description and amount for the current month.
*   **Monthly Totals:** View the total expenses for the current month.
*   **Delete Individual Expense:** Remove specific expenses from the list.
*   **Trend Analysis Chart:** A visual bar chart displays your total expenses for the last three months, giving you a quick overview of your spending patterns. Data for the trend analysis is loaded from LocalStorage or initialized with sample data if none is found.
*   **Delete All Current Month Expenses:** A dedicated button to clear all recorded expenses for the current month from LocalStorage.

## How to Run

1.  **Save the files:** Download `index.html`, `style.css`, and `script.js` into the same folder.
2.  **Open `index.html`:** Simply open the `index.html` file in your web browser. There is no server-side component required.

## Usage

1.  **Add Expense:**
    *   Enter a brief `Description` for your expense (e.g., "Groceries", "Rent", "Coffee").
    *   Enter the `Amount` of the expense (e.g., "50.75", "1200", "4.50").
    *   Click the "Add Expense" button. The expense will appear in the list and update the total.
2.  **Delete Expense:**
    *   To remove an individual expense, click the "Delete" button next to it in the list.
3.  **View Trend:**
    *   The "Expense Trend" section will automatically display a bar chart representing your total expenses for the last three months. Each bar's height is proportional to the total expense for that month.
    *   Initially, this will show sample data (August, September, October 2025). This data can be updated by modifying the `previous_totals` item in your browser's LocalStorage if you wish to simulate different historical data.
4.  **Delete All Current Month Expenses:**
    *   Click the "Delete All Current Month Expenses" button to clear all expenses for the current month. This action will prompt for confirmation and then remove all data for the current month from your browser's LocalStorage.

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)

---