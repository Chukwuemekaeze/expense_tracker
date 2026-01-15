import type { Expense } from '../types/expense';
import { ShoppingBag, Utensils, Car, Home, Tv, Smartphone } from 'lucide-react';

interface ExpenseListItemProps {
  expense: Expense;
  onClick?: () => void;
}

const ExpenseListItem = ({ expense, onClick }: ExpenseListItemProps) => {
  
  // Map category to icon and color
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    switch (categoryLower) {
      case 'food':
        return { icon: Utensils, bgColor: 'bg-cyan-100', iconColor: 'text-cyan-600' };
      case 'transport':
        return { icon: Car, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' };
      case 'shopping':
        return { icon: ShoppingBag, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' };
      case 'rent':
        return { icon: Home, bgColor: 'bg-green-100', iconColor: 'text-green-600' };
      case 'entertainment':
        return { icon: Tv, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' };
      case 'utilities':
        return { icon: Smartphone, bgColor: 'bg-pink-100', iconColor: 'text-pink-600' };
      default:
        return { icon: ShoppingBag, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' };
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    // If today
    if (diffInHours < 24 && date.getDate() === now.getDate()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    }
    
    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.getDate() === yesterday.getDate() && diffInHours < 48) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    }
    
    // Otherwise show full date
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const { icon: Icon, bgColor, iconColor } = getCategoryIcon(expense.category);

  return (
    <div 
      className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >

      {/* Left side: Icon and details */}
      <div className="flex items-center gap-4">
        {/* Icon container */}
        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {/* Expense details */}
        <div>
          <h3 className="font-semibold text-gray-900">{expense.description}</h3>
          <p className="text-sm text-gray-500">{formatDate(expense.created_at)}</p>
        </div>
      </div>

      {/* Right side: Amount */}
      <div className="text-lg font-semibold text-gray-900">
        -${expense.amount.toFixed(2)}
      </div>
    </div>
  );
};

export default ExpenseListItem;