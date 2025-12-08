import { Globe, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/uiSlice";
import { RootState } from "@/store";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <div className="flex items-center justify-between mb-2 relative">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Globe size={24} className="text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold leading-none tracking-tight">
            Latency Topology
          </h1>
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Visualizer
          </span>
        </div>
      </div>

      {/* Right Side: Theme Toggle */}
      <div className="relative group">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition"
        >
          {theme === "light" ? (
            <Sun size={20} className="text-slate-700" />
          ) : (
            <Moon size={20} className="text-slate-200" />
          )}
        </button>

        {/* Tooltip */}
        <span
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 bottom-0 translate-y-full opacity-0 group-hover:opacity-100
          bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none
          transition-opacity duration-200 z-50"
        >
          {theme === "light" ? "Light" : "Dark"} Mode
        </span>
      </div>
    </div>
  );
};

export default Header;
