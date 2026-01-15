import { Search, Settings } from "lucide-react";

interface HeaderProps {
  onSearchClick?: () => void;
  onSettingsClick?: () => void;
}

const Header = ({ onSearchClick, onSettingsClick }: HeaderProps) => {
  return (
    <header className="bg-cyan-400 px-6 py-4 flex items-center justify-between">
      {/* Left side: Logo and app name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl font-bold">E</span>
        </div>
        <h1 className="text-white text-xl font-bold">Expense Tracker</h1>
      </div>

      {/* Right side: Icon buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSearchClick}
          className="text-gray-900 hover:text-white transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
        <button
          onClick={onSettingsClick}
          className="text-gray-900 hover:text-white transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
