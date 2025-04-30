import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Inputs() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [entries, setEntries] = useState([]);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry = {
      amount: parseFloat(amount),
      category,
      date,
      description,
      type: "Expense",
    };

    setEntries([...entries, newEntry]);
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setShowExpenseForm(false);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry = {
      amount: parseFloat(amount),
      category: "Income",
      date,
      description: "Income Entry",
      type: "Income"
    };

    setEntries([...entries, newEntry]);
    setAmount("");
    setDate("");
    setShowIncomeForm(false);
  };

  // Calculations
  const totalIncome = entries
    .filter((entry) => entry.type === "Income")
    .reduce((sum, entry) => sum + entry.amount, 0);
    
  const totalExpense = entries
    .filter((entry) => entry.type === "Expense")
    .reduce((sum, entry) => sum + entry.amount, 0);
    
  const balance = totalIncome - totalExpense;

  // Get current date details
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed (0 = January)
  const currentYear = now.getFullYear();

  // Filter logic
  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const entryMonth = entryDate.getMonth();
    const entryYear = entryDate.getFullYear();

    if (filter === "This Month") {
      return entryMonth === currentMonth && entryYear === currentYear;
    } else if (filter === "Last Month") {
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return entryMonth === lastMonth && entryYear === lastMonthYear;
    } else if (filter === "This Year") {
      return entryYear === currentYear;
    } else {
      return true; // "All" filter
    }
  });

  // Charts - Only consider expense entries for the chart
  const expenseEntries = entries.filter(entry => entry.type === "Expense");
  
  // Get unique categories
  const categoryTotals = expenseEntries.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = 0;
    }
    acc[entry.category] += entry.amount;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Categories",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)"
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: $${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-4 justify-between">
        <h3 className="text-start px-2 text-xl font-bold"> Hello and Welcome User </h3>
        <div className="flex flex-wrap justify-end mb-6">
          <button
            className={`btn ${filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"} mx-1 px-3 py-1 rounded`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "This Month" ? "bg-blue-500 text-white" : "bg-gray-200"} mx-1 px-3 py-1 rounded`}
            onClick={() => setFilter("This Month")}
          >
            This Month
          </button>
          <button
            className={`btn ${filter === "Last Month" ? "bg-blue-500 text-white" : "bg-gray-200"} mx-1 px-3 py-1 rounded`}
            onClick={() => setFilter("Last Month")}
          >
            Last Month
          </button>
          <button
            className={`btn ${filter === "This Year" ? "bg-blue-500 text-white" : "bg-gray-200"} mx-1 px-3 py-1 rounded`}
            onClick={() => setFilter("This Year")}
          >
            This Year
          </button>
        </div>
      </div>

      {/* The amounts calculated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card shadow-lg bg-white text-black p-5 rounded-lg">
          <div className="grid grid-cols-2 items-center">
            <span className="text-lg font-bold">Balance</span>
            <p className={`text-2xl font-bold ${balance >= 0 ? "text-blue-500" : "text-red-500"}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="card shadow-lg bg-white text-black p-5 rounded-lg">
          <div className="grid grid-cols-2 items-center">
            <span className="text-lg font-bold">Income</span>
            <p className="text-2xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="card shadow-lg bg-white text-black p-5 rounded-lg">
          <div className="grid grid-cols-2 items-center">
            <span className="text-lg font-bold">Expense</span>
            <p className="text-2xl font-bold text-red-500">${totalExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Add Income/Expense Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between mt-4 mb-8">
        {/* Income Button */}
        <div className="card bg-white text-black shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 flex gap-4 items-center justify-between">
            <button
              className="text-3xl font-bold bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => setShowIncomeForm(true)}
            >
              +
            </button>
            <div className="text-start flex-1">
              <h2 className="text-md font-bold">Add Income</h2>
              <p className="text-sm text-gray-600">Quickly add a new income entry.</p>
            </div>
          </div>
        </div>

        {/* Expense Button */}
        <div className="card bg-white text-black shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 flex gap-4 items-center justify-between">
            <button
              className="text-3xl font-bold bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => setShowExpenseForm(true)}
            >
              -
            </button>
            <div className="text-start flex-1">
              <h2 className="text-md font-bold">Add Expense</h2>
              <p className="text-sm text-gray-600">Quickly add a new expense entry.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Expense Distribution</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ height: "400px" }}>
          {Object.keys(categoryTotals).length > 0 ? (
            <Doughnut data={chartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500">No expense data to display</p>
          )}
        </div>
      </div>

      {/* Income Form Overlay */}
      {showIncomeForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Income</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="number"
                  className="w-full bg-white text-black p-2 rounded"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (e.g., 100)"
                />
              </div>
              <div>
                <input
                  type="date"
                  className="w-full bg-white text-black p-2 rounded"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                  onClick={handleIncomeSubmit}
                >
                  Add Income
                </button>
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
                  onClick={() => setShowIncomeForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expense Form Overlay */}
      {showExpenseForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="number"
                  className="w-full bg-white text-black p-2 rounded"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (e.g., 50)"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full bg-white text-black p-2 rounded"
                  placeholder="Category (e.g., Groceries)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="date"
                  className="w-full bg-white text-black p-2 rounded"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  className="w-full bg-white text-black p-2 rounded"
                  placeholder="Description (Optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                  onClick={handleExpenseSubmit}
                >
                  Add Expense
                </button>
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
                  onClick={() => setShowExpenseForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtered Entries */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry, index) => (
              <div
                key={index}
                className={`bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 ${
                  entry.type === "Income" 
                    ? "border-l-4 border-green-500" 
                    : "border-l-4 border-red-500"
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">
                      {entry.type === "Income" ? "Income" : entry.category}
                    </h4>
                    <span className={`font-bold text-lg ${entry.type === "Income" ? "text-green-500" : "text-red-500"}`}>
                      {entry.type === "Income" ? "+" : "-"}${entry.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                  {entry.description && (
                    <p className="text-gray-700 mt-2 text-sm">
                      {entry.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No transactions to display for the selected period</p>
        )}
      </div>
    </div>
  );
}
