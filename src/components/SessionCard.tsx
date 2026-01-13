import { useState } from "react";
import { ChevronDown, ChevronUp, Target } from "lucide-react";
import type { GolfSession } from "@/types";
import { DrillBlock } from "./DrillBlock";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface SessionCardProps {
  session: GolfSession;
}

export function SessionCard({ session }: SessionCardProps) {
  const { dispatch } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  const completedCount = session.blocks.filter((b) => b.completed).length;
  const progress = (completedCount / session.blocks.length) * 100;
  const isComplete = completedCount === session.blocks.length;

  const handleToggleBlock = (blockId: string) => {
    dispatch({
      type: "TOGGLE_BLOCK",
      payload: { sessionId: session.id, blockId },
    });
  };

  return (
    <div
      className={cn(
        "bg-slate-800 rounded-2xl overflow-hidden border transition-all duration-300",
        isComplete ? "border-emerald-600/50" : "border-slate-700"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-dark">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white">{session.day}</h3>
            <p className="text-sm text-slate-400">Golf Practice • 60 min</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress badge */}
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              isComplete
                ? "bg-emerald-dark/30 text-emerald-300"
                : "bg-slate-700 text-slate-300"
            )}
          >
            {completedCount}/{session.blocks.length}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="h-1 bg-slate-700">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Blocks */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {session.blocks.map((block, index) => (
            <DrillBlock
              key={block.id}
              block={block}
              blockNumber={index + 1}
              onToggle={() => handleToggleBlock(block.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
