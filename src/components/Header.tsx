import { ClipboardCheck, Clock, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

interface HeaderProps {
  view?: string;
  onNavigate?: (view: "schedule" | "history" | "assessment") => void;
}

export function Header({ view = "schedule", onNavigate }: HeaderProps) {
  const { state, dispatch } = useApp();

  const handleReset = () => {
    if (window.confirm("Reset all progress and start over? Current week will be saved to history.")) {
      dispatch({ type: "RESET_AND_ARCHIVE" });
      onNavigate?.("schedule");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-dark/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <button
          className="flex items-center gap-3"
          onClick={() => onNavigate?.("schedule")}
        >
          <div className="bg-emerald-dark p-2 rounded-xl">
            <Timer className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">The 4-Hour Golfer</h1>
            <p className="text-xs text-slate-400">1 Hour x 4 Days = Results</p>
          </div>
        </button>

        {state.setupComplete && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.(view === "history" ? "schedule" : "history")}
              className={view === "history" ? "text-emerald-400" : ""}
              title="History"
            >
              <Clock className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.(view === "assessment" ? "schedule" : "assessment")}
              className={view === "assessment" ? "text-teal-400" : ""}
              title="TPI Assessment"
            >
              <ClipboardCheck className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} title="Reset week">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
