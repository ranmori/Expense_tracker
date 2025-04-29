import React, { useState } from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip , Legend} from "chart.js";
// register the chart
ChartJS.register(ArcElement, Tooltip,Legend);




export default function Inputs() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState("All");
    const [entries, setEntries] = useState([]);
   const [showIncomeForm, setShowIncomeForm] = useState(false);
   const[ showExpenseForm, setShowExpenseForm ]= useState(false)
    

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
            type:"Expense",
        };

        setEntries([...entries, newEntry]);
        setAmount("");
        setCategory("");
        setDate("");
        setDescription("");
        setShowExpenseForm(false);
    };
 const handleIncomeSubmit=(e) =>{
    e.preventDefault();
    if (!amount || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    const newEntry = {
        amount:parseFloat(amount),
        date,
        type:"Income"
        
    };

    setEntries([...entries, newEntry]);
    setAmount("");

    setDate("");
    setShowIncomeForm(false);

    
 }

//  calculation 

const totalIncome= entries.filter((entry)=>entry.type==="Income").reduce((sum,entry)=> sum + entry.amount, 0 );
const totalExpense= entries.filter((entry)=>entry.type==="Expense").reduce((sum,entry)=> sum + entry.amount, 0  );
const balance= totalIncome - totalExpense;

    

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
    // charts 
    const categoryTotals = entries.reduce((acc, entry) => { 
    if (!acc[entry.category]){
        acc[entry.category] = 0;
    }
    acc[entry.category] += entry.amount;
    return acc;
}, {});


          const chartData = {
            labels: Object.keys(categoryTotals),
     
            datasets: [{
              label: 'Categories',
              data: Object.values(categoryTotals),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
          const chartOptions={
            responsive:true,
            plugins:{
                legend:{
                    position: "top",
                },
                tooltip:{
                    callbacks:{
                        label:function(context){
                            return `$(context.label): $${context.raw}`;
                        }
                    }
                }
            }
          }

    return (
        <>
              {/* Filter Buttons */}
      <div className="grid grid-cols-2 mt-10 gap-10 justify-between">
                <h3 className="text-start px-2"> Hello and Welcome User </h3>
                <div className="flex justify-end mb-6">
                    <button
                        className={`btn ${filter === "All" ? "btn-primary" : "btn-outline"} mx-2`}
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>
                    <button
                        className={`btn ${filter === "This Month" ? "btn-primary" : "btn-outline"} mx-2`}
                        onClick={() => setFilter("This Month")}
                    >
                        This Month
                    </button>
                    <button
                        className={`btn ${filter === "Last Month" ? "btn-primary" : "btn-outline"} mx-2`}
                        onClick={() => setFilter("Last Month")}
                    >
                        Last Month
                    </button>
                    <button
                        className={`btn ${filter === "This Year" ? "btn-primary" : "btn-outline"} mx-2`}
                        onClick={() => setFilter("This Year")}
                    >
                        This Year
                    </button>
                </div>
            </div>
            

        {/* the amounts calculated */}
        <div className="grid grid-cols-3 gap-2 align-center ">

<div className="card shadow-sm bg-white  text-black grid grid-cols-2 text-center p-5 align-centern justify-between p-5  "> 
    <span className="text-sm text-bold">Balance</span>
    <p className="text-bold text-2xl text-blue-500 ">${balance}</p>

</div>
<div className="card shadow-sm bg-white text-black grid grid-cols-2 align-center justify-between p-5 "> 
    <span>income</span>
    <p className="text-2xl text-blue-500" >${totalIncome}</p>

</div>
<div className="card shadow-sm bg-white text-black flex grid grid-cols-2 align-center justify-between p-5 "> 
    <span>expense</span>
    <p className="text-exl text-red-100 ">${totalExpense}</p>

</div>
</div>


{/* Add Income/Expense Buttons */}
<div className="grid grid-cols-2 gap-10 justify-between mt-10">
    {/* Income Button */}
    <div className="card bg-white text-black text-start shadow-lg rounded-lg w-full max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300">
        <div className="p-4 flex gap-4 items-center justify-between">
            <button
                className="text-3xl font-bold bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => setShowIncomeForm(true)}
            >
                +
            </button>
            <div className="text-start">
                <h2 className="text-md font-bold">Add Income</h2>
                <p className="text-sm text-gray-600">Quickly add a new income entry.</p>
            </div>
        </div>
    </div>

    {/* Expense Button */}
    <div className="card bg-white text-black text-end shadow-lg rounded-lg w-full max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300">
        <div className="p-4 flex gap-4 items-center justify-between">
            <button
                className="text-3xl font-bold bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => setShowExpenseForm(true)}
            >
                -
            </button>
            <div className="text-start">
                <h2 className="text-md font-bold">Add Expense</h2>
                <p className="text-sm text-gray-600">Quickly add a new expense entry.</p>
            </div>
        </div>
    </div>
</div>


<Doughnut data={chartData} options={chartOptions}/>

            {/* Overlay for Income Form */}
            {showIncomeForm && (
                <div className="fixed top-0 left-0 w-full p-6 h-full bg-black-100 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
                    <form
                        onSubmit={handleIncomeSubmit}
                        className="card grid gap-4 px-6 py-4 text-center max-w-md mx-auto bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg rounded-lg"
                    >
                        <h2 className="text-xl font-bold mb-4">Add New Income</h2>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-white text-black"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount (e.g., 100)"
                            title="Enter the amount for this entry"
                        />
                        <input
                            type="date"
                            className="input input-bordered w-full bg-white text-black"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <button className="btn btn-primary w-full">Add Income</button>
                        <button
                            type="button"
                            className="btn btn-secondary w-full mt-2"
                            onClick={() => setShowIncomeForm(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* Overlay for Expense Form */}
            {showExpenseForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-black-100 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
                    <form
                        onSubmit={handleExpenseSubmit}
                        className="card grid gap-4 px-6 py-4 text-center max-w-md mx-auto bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg rounded-lg"
                    >
                        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-white text-black"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount (e.g., 50)"
                            title="Enter the amount for this entry"
                        />
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white text-black"
                            placeholder="Category (e.g., Groceries)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            className="input input-bordered w-full bg-white text-black"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <textarea
                            className="textarea textarea-bordered w-full bg-white text-black"
                            placeholder="Description (Optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <button className="btn btn-primary w-full">Add Expense</button>
                        <button
                            type="button"
                            className="btn btn-secondary w-full mt-2"
                            onClick={() => setShowExpenseForm(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            
        
          {/* Filtered Entries */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    {filteredEntries.map((entry, index) => (
        <div
            key={index}
            className="card  bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg rounded-lg mx-auto transition-transform transform hover:scale-105"
        >
            <div className="card-body p-6 text-start">
                <h2 className="card-title text-start text-xl font-bold mb-4">
                    {entry.type === "Income" ? "Income Entry" : "Expense Entry"}
                </h2>
                <p className="text-lg">
                    <span className="font-semibold">Amount:</span> ${entry.amount.toFixed(2)}
                </p>
                <p className="text-lg">
                    <span className="font-semibold">Category:</span> {entry.category || "N/A"}
                </p>
                <p className="text-lg">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(entry.date).toLocaleDateString()}
                </p>
                <p className="text-lg">
                    <span className="font-semibold">Description:</span>{" "}
                    {entry.description || "No description provided"}
                </p>
            </div>
        </div>
    ))}
</div>

        </>
    );
}