import { useState } from "react";
import { ExternalLink, Heart, MessageSquare, Shuffle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { ExerciseBlock as ExerciseBlockType } from "@/types";
import { cn } from "@/lib/utils";

interface ExerciseBlockProps {
  block: ExerciseBlockType;
  variant: "warmup" | "main" | "cooldown";
  exerciseNumber?: number;
  onToggle: () => void;
  onSwap?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  note?: string;
  onNoteChange?: (text: string) => void;
}

export function ExerciseBlock({
  block,
  variant,
  exerciseNumber,
  onToggle,
  onSwap,
  isFavorite,
  onToggleFavorite,
  note,
  onNoteChange,
}: ExerciseBlockProps) {
  const [showNote, setShowNote] = useState(false);
  const exercise = block.exercise;

  const variantStyles = {
    warmup: "border-amber-500/30 bg-amber-500/5",
    main: "border-slate-700 bg-slate-800/50",
    cooldown: "border-blue-500/30 bg-blue-500/5",
  };

  const badgeStyles = {
    warmup: "bg-amber-600/30 text-amber-300",
    main: "bg-slate-600/50 text-slate-300",
    cooldown: "bg-blue-600/30 text-blue-300",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl p-4 border transition-all duration-200",
        variantStyles[variant],
        block.completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={block.completed}
          onCheckedChange={onToggle}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                badgeStyles[variant]
              )}
            >
              {exercise.category}
            </span>
            {exercise.duration && (
              <span className="text-xs text-slate-400">{exercise.duration}</span>
            )}
            {exercise.sets && exercise.reps && (
              <span className="text-xs text-slate-400">
                {exercise.sets} x {exercise.reps}
              </span>
            )}
          </div>

          <h4
            className={cn(
              "font-medium mb-1 transition-all",
              block.completed ? "text-slate-400 line-through" : "text-white"
            )}
          >
            {exercise.name}
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            {exercise.description}
          </p>

          {exercise.url && (
            <a
              href={exercise.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mt-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Watch video</span>
            </a>
          )}

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
            title="Swap exercise"
          >
            <Shuffle className="h-3.5 w-3.5" />
          </button>
        )}
        {exerciseNumber && (
          <span className="text-xs text-slate-500 font-mono">#{exerciseNumber}</span>
        )}
      </div>
    </div>
  );
}
