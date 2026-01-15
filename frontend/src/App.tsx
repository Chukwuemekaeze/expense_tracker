import { useState, useEffect } from "react";
import type { Expense, ExpenseInput } from "./types/expense";
import Header from "./components/Header";
import TotalExpensesCard from "./components/TotalExpensesCard";
import QuickAddForm from "./components/QuickAddForm";
import RecentHistory from "./components/RecentHistory";
import * as api from "./services/api";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currency] = useState<string>("NGN");

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Rent",
    "Entertainment",
    "Utilities",
  ];

  // Fetch all expenses on component mount
  useEffect(() => {
    // Load expenses from backend
    const loadExpenses = async () => {
      try {
        const data = await api.fetchExpenses();
        setExpenses(data);
      } catch (error) {
        alert(
          "Failed to load expenses. Make sure the backend server is running."
        );
        console.error("Error loading expenses:", error);
      }
    };
    loadExpenses();

    // Load total from backend
    const loadTotal = async () => {
      try {
        const data = await api.fetchTotal();
        setTotal(data.total);
      } catch (error) {
        console.error("Error loading total:", error);
      }
    };

    loadTotal();
  }, []);

  // Add new expense
  const handleAddExpense = async (expenseInput: ExpenseInput) => {
    try {
      const newExpense = await api.createExpense(expenseInput);

      // Update local state
      setExpenses([newExpense, ...expenses]);
      setTotal(total + newExpense.amount);

      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  // Handle view all (placeholder for now)
  const handleViewAll = () => {
    console.log("View all expenses clicked");
    alert("View all expenses - This feature will be implemented later!");
  };

  // Handle expense item click (placeholder for now)
  const handleExpenseClick = (expenseId: number) => {
    console.log("Expense clicked:", expenseId);
  };

  // Handle search click (placeholder)
  const handleSearchClick = () => {
    console.log("Search clicked");
    alert("Search feature coming soon!");
  };

  // Handle settings click (placeholder)
  const handleSettingsClick = () => {
    console.log("Settings clicked");
    alert("Settings feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onSearchClick={handleSearchClick}
        onSettingsClick={handleSettingsClick}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TotalExpensesCard total={total} currency={currency} />
          <QuickAddForm
            onAddExpense={handleAddExpense}
            categories={categories}
          />
        </div>

        <RecentHistory
          expenses={expenses}
          onViewAll={handleViewAll}
          onExpenseClick={handleExpenseClick}
        />
      </div>
    </div>
  );
}

export default App;
