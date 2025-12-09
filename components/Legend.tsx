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
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 
  bg-slate-100 dark:bg-slate-800 px-4 py-2 
  rounded-full shadow-md hidden md:flex gap-4 text-xs"
      >
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00FF00]"></span>
          <span className="text-slate-600 dark:text-slate-300">
            Low &lt;120ms
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FFD700]"></span>
          <span className="text-slate-600 dark:text-slate-300">
            Med 120–250ms
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF0000]"></span>
          <span className="text-slate-600 dark:text-slate-300">
            High &gt;250ms
          </span>
        </div>
      </div>

      {/* Start/Stop Rotation button at top-right of Globe */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={toggleRotation}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-200 shadow-md 
            ${
              isRotating
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }
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
