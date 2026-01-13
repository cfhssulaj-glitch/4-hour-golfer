import { RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export function Header() {
  const { state, dispatch } = useApp();

  const handleReset = () => {
    if (window.confirm("Reset all progress and start over?")) {
      dispatch({ type: "RESET" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-dark/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-dark p-2 rounded-xl">
            <Timer className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">The 4-Hour Golfer</h1>
            <p className="text-xs text-slate-400">1 Hour × 4 Days = Results</p>
          </div>
        </div>

        {state.setupComplete && (
          <Button variant="ghost" size="icon" onClick={handleReset}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
