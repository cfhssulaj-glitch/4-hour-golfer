import { useState } from "react";
import { Clock, ExternalLink, Heart, MessageSquare, Shuffle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Block } from "@/types";
import { cn } from "@/lib/utils";

interface DrillBlockProps {
  block: Block;
  blockNumber: number;
  onToggle: () => void;
  onSwap?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  note?: string;
  onNoteChange?: (text: string) => void;
}

export function DrillBlock({
  block,
  blockNumber,
  onToggle,
  onSwap,
  isFavorite,
  onToggleFavorite,
  note,
  onNoteChange,
}: DrillBlockProps) {
  const [showNote, setShowNote] = useState(false);

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

          <div className="flex items-center gap-3 mt-2">
            <p className="text-xs text-slate-500">
              Source: {block.drill.source}
            </p>
            {block.drill.url && (
              <a
                href={block.drill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                title="Watch video"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {showNote && onNoteChange && (
            <textarea
              value={note || ""}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Add a note..."
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg p-2 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-emerald-500"
              rows={2}
            />
          )}
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className={cn(
              "p-1 rounded hover:bg-slate-600/50 transition-colors",
              isFavorite ? "text-red-400" : "text-slate-500 hover:text-red-400"
            )}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="h-3.5 w-3.5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}
        {onNoteChange && (
          <button
            onClick={() => setShowNote(!showNote)}
            className={cn(
              "p-1 rounded hover:bg-slate-600/50 transition-colors",
              note ? "text-emerald-400" : "text-slate-500 hover:text-white"
            )}
            title="Notes"
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </button>
        )}
        {onSwap && (
          <button
            onClick={onSwap}
            className="p-1 rounded hover:bg-slate-600/50 text-slate-500 hover:text-white transition-colors"
            title="Swap drill"
          >
            <Shuffle className="h-3.5 w-3.5" />
          </button>
        )}
        <span className="text-xs text-slate-500 font-mono">Block {blockNumber}/4</span>
      </div>
    </div>
  );
}
