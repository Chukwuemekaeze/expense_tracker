interface TotalExpensesCardProps {
  total: number;
  currency: string;
  onCurrencyChange?: (currency: string) => void;
}

const TotalExpensesCard = ({ total, currency, onCurrencyChange }: TotalExpensesCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Label */}
      <p className="text-gray-500 text-sm font-medium tracking-wide mb-2">
        TOTAL EXPENSES
      </p>

      {/* Amount and Currency */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold text-gray-900">
          ${total.toFixed(2)}
        </h2>
        <button className="bg-cyan-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-500 transition-colors">
          {currency}
        </button>
      </div>

      {/* Chart placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center">
        <p className="text-white text-lg font-medium">Chart Image Goes Here</p>
      </div>
    </div>
  );
};
export default TotalExpensesCard;