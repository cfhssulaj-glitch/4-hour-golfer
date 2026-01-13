export interface Drill {
  id: string;
  category: string;
  name: string;
  description: string;
  source: string;
}

export interface Exercise {
  id: string;
  category: string;
  name: string;
  description: string;
  sets?: string;
  reps?: string;
  duration?: string;
  source: string;
}

export interface Block {
  id: string;
  drill: Drill;
  completed: boolean;
}

export interface ExerciseBlock {
  id: string;
  exercise: Exercise;
  completed: boolean;
}

// Golf session: 4 x 15-minute drill blocks
export interface GolfSession {
  id: string;
  day: string;
  type: "golf";
  blocks: Block[];
}

// Fitness session: warmup, main exercises, cooldown
export interface FitnessSession {
  id: string;
  day: string;
  type: "fitness";
  warmup: ExerciseBlock;
  mainExercises: ExerciseBlock[];
  cooldown: ExerciseBlock;
}

export type Session = GolfSession | FitnessSession;

export interface AppState {
  selectedDays: string[];
  schedule: Session[];
  setupComplete: boolean;
}

export type AppAction =
  | { type: "SET_DAYS"; payload: string[] }
  | { type: "GENERATE_SCHEDULE" }
  | { type: "TOGGLE_BLOCK"; payload: { sessionId: string; blockId: string } }
  | { type: "RESET" }
  | { type: "LOAD_STATE"; payload: AppState };

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
