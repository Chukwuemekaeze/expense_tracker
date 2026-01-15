import type { Expense } from "../types/expense";
import ExpenseListItem from "./ExpenseListItem";

interface RecentHistoryProps {
  expenses: Expense[];
  onViewAll: () => void;
  onExpenseClick?: (expenseId: number) => void;
}

const RecentHistory = ({
  expenses,
  onViewAll,
  onExpenseClick,
}: RecentHistoryProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent History</h2>
        <button
          onClick={onViewAll}
          className="text-cyan-500 text-sm font-semibold hover:text-cyan-600 transition-colors"
        >
          VIEW ALL
        </button>
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No expenses yet. Add one above!
          </p>
        ) : (
          expenses.map((expense) => (
            <ExpenseListItem
              key={expense.id}
              expense={expense}
              onClick={() => onExpenseClick?.(expense.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentHistory;
