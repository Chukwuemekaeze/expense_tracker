import { useState } from "react";
import type { ExpenseInput } from "../types/expense";

interface QuickAddFormProps {
  onAddExpense: (expense: ExpenseInput) => void;
  categories: string[];
}

const QuickAddForm = ({ onAddExpense, categories }: QuickAddFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("Food");
  const [description, setDescription] = useState<string>("");
  const handleSubmit = () => {
    // Validate inputs
    if (!amount || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    // Create expense object
    const newExpense: ExpenseInput = {
      amount: numericAmount,
      category: category,
      description: description.trim(),
    };

    // Call parent callback
    onAddExpense(newExpense);

    // Reset form
    setAmount("");
    setCategory("Food");
    setDescription("");
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Add</h2>

      {/* Amount and Category Row */}
      <div className="flex gap-4 mb-4">
        {/* Amount Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description Row */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Lunch at cafe..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            className="bg-cyan-400 text-white px-8 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition-colors"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddForm;
