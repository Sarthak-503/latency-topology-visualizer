import { Play, Pause } from "lucide-react";

export default function Legend({
  toggleRotation,
  isRotating,
}: {
  toggleRotation: () => void;
  isRotating: boolean;
}) {
  return (
    <>
      {/* Latency Legend at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white/90 dark:bg-slate-900/80 backdrop-blur px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 hidden md:flex gap-6 text-xs text-slate-600 dark:text-slate-300 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-[#00FF00] rounded-full shadow-[0_0_5px_#00FF00]"></div>
          <span>&lt; 120ms (Low)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-[#FFD700] rounded-full shadow-[0_0_5px_#FFD700]"></div>
          <span>120-250ms (Med)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-[#FF0000] rounded-full shadow-[0_0_5px_#FF0000]"></div>
          <span>&gt; 250ms (High)</span>
        </div>
      </div>

      {/* Start/Stop Rotation button at top-right of Globe */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={toggleRotation}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-200 shadow-md 
            ${isRotating ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}
          `}
        >
          {isRotating ? <Pause size={16} /> : <Play size={16} />}
          <span className="text-xs font-semibold">
            {isRotating ? "Stop" : "Auto Rotate"}
          </span>
        </button>
      </div>
    </>
  );
}
