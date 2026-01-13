import { useApp } from "@/context/AppContext";
import { SessionCard } from "./SessionCard";
import { FitnessSessionCard } from "./FitnessSessionCard";
import type { GolfSession, FitnessSession } from "@/types";

export function WeekSchedule() {
  const { state } = useApp();

  // Calculate total blocks/exercises
  const { totalBlocks, completedBlocks } = state.schedule.reduce(
    (acc, session) => {
      if (session.type === "golf") {
        return {
          totalBlocks: acc.totalBlocks + session.blocks.length,
          completedBlocks:
            acc.completedBlocks +
            session.blocks.filter((b) => b.completed).length,
        };
      } else {
        const total = session.mainExercises.length + 2; // +2 for warmup/cooldown
        const completed =
          (session.warmup.completed ? 1 : 0) +
          session.mainExercises.filter((e) => e.completed).length +
          (session.cooldown.completed ? 1 : 0);
        return {
          totalBlocks: acc.totalBlocks + total,
          completedBlocks: acc.completedBlocks + completed,
        };
      }
    },
    { totalBlocks: 0, completedBlocks: 0 }
  );

  const overallProgress = Math.round((completedBlocks / totalBlocks) * 100);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Overall Progress */}
      <div className="bg-slate-800 rounded-2xl p-4 mb-6 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Weekly Progress</span>
          <span className="text-sm font-medium text-white">
            {completedBlocks}/{totalBlocks} exercises
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          {overallProgress === 100
            ? "Week complete! Great work."
            : `${overallProgress}% complete`}
        </p>
      </div>

      {/* Sessions */}
      <div className="space-y-4">
        {state.schedule.map((session) =>
          session.type === "golf" ? (
            <SessionCard key={session.id} session={session as GolfSession} />
          ) : (
            <FitnessSessionCard
              key={session.id}
              session={session as FitnessSession}
            />
          )
        )}
      </div>
    </div>
  );
}
