import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import type { WeekHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { cn, calculateCompletion } from "@/lib/utils";

function HistoryEntry({ entry }: { entry: WeekHistory }) {
  const [expanded, setExpanded] = useState(false);

  const golfSessions = entry.sessions.filter((s) => s.type === "golf");
  const fitnessSessions = entry.sessions.filter((s) => s.type === "fitness");

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
      >
        <div className="text-left">
          <p className="text-sm font-medium text-white">{entry.date}</p>
          <p className="text-xs text-slate-400">
            {entry.days.length} days • {golfSessions.length} golf • {fitnessSessions.length} fitness
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              entry.completionRate === 100
                ? "bg-emerald-dark/30 text-emerald-300"
                : entry.completionRate >= 50
                  ? "bg-amber-600/30 text-amber-300"
                  : "bg-slate-700 text-slate-300"
            )}
          >
            {entry.completionRate}%
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          {entry.sessions.map((session) => {
            const { total, completed } = calculateCompletion([session]);
            const label = session.type === "golf" ? "Golf" : "Fitness";
            const unit = session.type === "golf" ? "drills" : "exercises";
            return (
              <div key={session.id} className="flex items-center justify-between text-xs">
                <span className="text-slate-300">{session.day} — {label}</span>
                <span className="text-slate-400">{completed}/{total} {unit}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function HistoryView() {
  const { history, clearHistory } = useHistory();

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Weekly History</h2>
          <p className="text-sm text-slate-400">
            {history.length} week{history.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm("Clear all history?")) clearHistory();
            }}
            className="text-slate-400 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No history yet.</p>
          <p className="text-sm text-slate-600 mt-1">
            Complete a week and reset to archive it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <HistoryEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
