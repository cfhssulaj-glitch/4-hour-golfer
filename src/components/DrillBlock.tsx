import { Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Block } from "@/types";
import { cn } from "@/lib/utils";

interface DrillBlockProps {
  block: Block;
  blockNumber: number;
  onToggle: () => void;
}

export function DrillBlock({ block, blockNumber, onToggle }: DrillBlockProps) {
  return (
    <div
      className={cn(
        "relative bg-slate-800/50 rounded-xl p-4 border transition-all duration-200",
        block.completed
          ? "border-emerald-600/50 bg-emerald-dark/10"
          : "border-slate-700"
      )}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={block.completed}
          onCheckedChange={onToggle}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-dark/30 text-emerald-300">
              {block.drill.category}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="h-3 w-3" />
              <span>15 min</span>
            </div>
          </div>

          <h4
            className={cn(
              "font-medium mb-1 transition-all",
              block.completed ? "text-slate-400 line-through" : "text-white"
            )}
          >
            {block.drill.name}
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            {block.drill.description}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Source: {block.drill.source}
          </p>
        </div>
      </div>

      {/* Block number indicator */}
      <div className="absolute top-3 right-3 text-xs text-slate-500 font-mono">
        Block {blockNumber}/4
      </div>
    </div>
  );
}
