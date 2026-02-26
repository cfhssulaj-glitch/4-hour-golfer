import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Dumbbell, Flame, RefreshCw, Snowflake } from "lucide-react";
import type { FitnessSession } from "@/types";
import { ExerciseBlock } from "./ExerciseBlock";
import { useApp } from "@/context/AppContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useNotes } from "@/hooks/useNotes";
import { cn } from "@/lib/utils";

interface FitnessSessionCardProps {
  session: FitnessSession;
}

export function FitnessSessionCard({ session }: FitnessSessionCardProps) {
  const { dispatch } = useApp();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getNote, setNote } = useNotes();

  const totalExercises = session.mainExercises.length + 2;
  const completedCount =
    (session.warmup.completed ? 1 : 0) +
    session.mainExercises.filter((e) => e.completed).length +
    (session.cooldown.completed ? 1 : 0);
  const progress = (completedCount / totalExercises) * 100;
  const isComplete = completedCount === totalExercises;

  const [isExpanded, setIsExpanded] = useState(!isComplete);

  // Auto-collapse when all exercises completed
  useEffect(() => {
    if (isComplete) setIsExpanded(false);
  }, [isComplete]);

  const handleToggleBlock = (blockId: string) => {
    dispatch({
      type: "TOGGLE_BLOCK",
      payload: { sessionId: session.id, blockId },
    });
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "REGENERATE_SESSION", payload: { sessionId: session.id } });
  };

  const exerciseProps = (exerciseId: string) => ({
    isFavorite: isFavorite(exerciseId),
    onToggleFavorite: () => toggleFavorite(exerciseId),
    note: getNote(exerciseId),
    onNoteChange: (text: string) => setNote(exerciseId, text),
  });

  return (
    <div
      className={cn(
        "bg-slate-800 rounded-2xl overflow-hidden border transition-all duration-300",
        isComplete ? "border-amber-500/50" : "border-slate-700"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-600">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white">{session.day}</h3>
            <p className="text-sm text-slate-400">TPI Fitness • 60 min</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            className="p-1.5 rounded-lg hover:bg-slate-600/50 text-slate-400 hover:text-white transition-colors"
            title="Regenerate session"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              isComplete
                ? "bg-amber-600/30 text-amber-300"
                : "bg-slate-700 text-slate-300"
            )}
          >
            {completedCount}/{totalExercises}
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
          className="h-full bg-amber-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Warmup Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <h4 className="text-sm font-medium text-amber-400 uppercase tracking-wide">
                Warmup • 5 min
              </h4>
            </div>
            <ExerciseBlock
              block={session.warmup}
              variant="warmup"
              onToggle={() => handleToggleBlock(session.warmup.id)}
              onSwap={() => dispatch({ type: "SWAP_BLOCK", payload: { sessionId: session.id, blockId: session.warmup.id } })}
              {...exerciseProps(session.warmup.exercise.id)}
            />
          </div>

          {/* Main Exercises Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="h-4 w-4 text-slate-400" />
              <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                Main Workout • 50 min
              </h4>
            </div>
            <div className="space-y-3">
              {session.mainExercises.map((block, index) => (
                <ExerciseBlock
                  key={block.id}
                  block={block}
                  variant="main"
                  exerciseNumber={index + 1}
                  onToggle={() => handleToggleBlock(block.id)}
                  onSwap={() => dispatch({ type: "SWAP_BLOCK", payload: { sessionId: session.id, blockId: block.id } })}
                  {...exerciseProps(block.exercise.id)}
                />
              ))}
            </div>
          </div>

          {/* Cooldown Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Snowflake className="h-4 w-4 text-blue-400" />
              <h4 className="text-sm font-medium text-blue-400 uppercase tracking-wide">
                Cooldown • 5 min
              </h4>
            </div>
            <ExerciseBlock
              block={session.cooldown}
              variant="cooldown"
              onToggle={() => handleToggleBlock(session.cooldown.id)}
              onSwap={() => dispatch({ type: "SWAP_BLOCK", payload: { sessionId: session.id, blockId: session.cooldown.id } })}
              {...exerciseProps(session.cooldown.exercise.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
