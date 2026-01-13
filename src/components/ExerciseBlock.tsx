import { Checkbox } from "@/components/ui/checkbox";
import type { ExerciseBlock as ExerciseBlockType } from "@/types";
import { cn } from "@/lib/utils";

interface ExerciseBlockProps {
  block: ExerciseBlockType;
  variant: "warmup" | "main" | "cooldown";
  exerciseNumber?: number;
  onToggle: () => void;
}

export function ExerciseBlock({
  block,
  variant,
  exerciseNumber,
  onToggle,
}: ExerciseBlockProps) {
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
                {exercise.sets} × {exercise.reps}
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
        </div>
      </div>

      {exerciseNumber && (
        <div className="absolute top-3 right-3 text-xs text-slate-500 font-mono">
          #{exerciseNumber}
        </div>
      )}
    </div>
  );
}
