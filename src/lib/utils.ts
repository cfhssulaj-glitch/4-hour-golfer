import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Session } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateCompletion(sessions: Session[]): { total: number; completed: number; percent: number } {
  let total = 0;
  let completed = 0;
  for (const session of sessions) {
    if (session.type === "golf") {
      total += session.blocks.length;
      completed += session.blocks.filter((b) => b.completed).length;
    } else {
      total += session.mainExercises.length + 2;
      completed +=
        (session.warmup.completed ? 1 : 0) +
        session.mainExercises.filter((e) => e.completed).length +
        (session.cooldown.completed ? 1 : 0);
    }
  }
  return { total, completed, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
}
