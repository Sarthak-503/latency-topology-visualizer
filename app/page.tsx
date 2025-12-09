"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleSidebar, selectNode } from "@/store/slices/uiSlice";
import { useSimulation } from "@/hooks/usePingSimulation";
import GlobeWrapper from "@/components/globe/GlobeWrapper";
import ControlPanel from "@/components/panel/control-panel/ControlPanel";
import StatsPanel from "@/components/panel/stats-panel/StatsPanel";
import Legend from "@/components/Legend";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const dispatch = useDispatch();

    const [isRotating, setIsRotating] = useState(true);
  
  const toggleRotation = () => setIsRotating((prev) => !prev);
  useSimulation();

    const theme = useSelector((state: RootState) => state.ui.theme);
  
    useEffect(() => {
      const root = document.documentElement;
  
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }, [theme]);

  const { isSidebarOpen, selectedNodeId } = useSelector(
    (state: RootState) => state.ui
  );
  const { nodes, links } = useSelector((state: RootState) => state.topology);
  const selectedNode = selectedNodeId
    ? nodes.find((node) => node.id === selectedNodeId) ?? null
    : null;

  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden font-sans transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <GlobeWrapper isRotating={isRotating} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex">
        <div
          className={`pointer-events-auto h-full transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ControlPanel />
        </div>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="pointer-events-auto absolute top-4 left-4 z-50 border-2 md:hidden shadow-lg"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>

        <div className="flex-1 relative"></div>

        <div
          className={`pointer-events-auto h-full transition-transform duration-300 ease-in-out ${
            selectedNodeId ? "translate-x-0" : "translate-x-full"
          } absolute right-0 md:relative md:translate-x-0`}
        >
          <StatsPanel
            selectedNode={selectedNode}
            links={links}
            onClose={() => dispatch(selectNode(null))}
            className="h-full"
          />
        </div>
      </div>

      <Legend toggleRotation={toggleRotation} isRotating={isRotating} />
    </div>
  );
};

export default App;
