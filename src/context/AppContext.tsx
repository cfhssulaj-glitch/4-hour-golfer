import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type {
  AppState,
  AppAction,
  Session,
  GolfSession,
  FitnessSession,
  Block,
  ExerciseBlock,
  Drill,
  Exercise,
  WeekHistory,
} from "@/types";
import { calculateCompletion } from "@/lib/utils";
import {
  golfDrills,
  warmupExercises,
  mainExercises,
  cooldownExercises,
} from "@/data/drills";
import { DAYS_OF_WEEK } from "@/types";

const STORAGE_KEY = "four-hour-golfer-state";

const initialState: AppState = {
  selectedDays: [],
  sessionTypes: {},
  schedule: [],
  setupComplete: false,
};

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateGolfSession(
  day: string,
  availableDrills: Drill[]
): { session: GolfSession; usedDrills: Drill[] } {
  // Select 4 drills, trying to get variety in categories
  const categories = ["Face Contact", "Ground Contact", "Face Direction", "Putting", "Short Game"];
  const selectedDrills: Drill[] = [];

  // Try to get one from each main category first
  for (const category of categories.slice(0, 4)) {
    const categoryDrills = availableDrills.filter(
      (d) => d.category === category && !selectedDrills.includes(d)
    );
    if (categoryDrills.length > 0) {
      const selected = categoryDrills[Math.floor(Math.random() * categoryDrills.length)];
      selectedDrills.push(selected);
    }
  }

  // If we don't have 4 yet, fill with random remaining drills
  while (selectedDrills.length < 4) {
    const remaining = availableDrills.filter((d) => !selectedDrills.includes(d));
    if (remaining.length === 0) break;
    selectedDrills.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  const blocks: Block[] = selectedDrills.map((drill, index) => ({
    id: `${day}-block-${index}`,
    drill,
    completed: false,
  }));

  return {
    session: {
      id: `session-${day}`,
      day,
      type: "golf",
      blocks,
    },
    usedDrills: selectedDrills,
  };
}

function generateFitnessSession(
  day: string,
  availableMain: Exercise[],
  usedWarmups: Set<string>,
  usedCooldowns: Set<string>
): { session: FitnessSession; usedMainExercises: Exercise[] } {
  // Select warmup (avoid repeats if possible)
  const availableWarmups = warmupExercises.filter((w) => !usedWarmups.has(w.id));
  const warmup = availableWarmups.length > 0
    ? availableWarmups[Math.floor(Math.random() * availableWarmups.length)]
    : warmupExercises[Math.floor(Math.random() * warmupExercises.length)];

  // Select 5 main exercises with category variety
  const categories = [
    "Hip Mobility",
    "Glute Activation",
    "Anti-Sway",
    "Anti-Early Extension",
    "T-Spine Mobility",
    "Core Stability",
    "Power",
  ];

  const selectedMain: Exercise[] = [];
  const shuffledCategories = shuffleArray(categories);

  // Get one from each of 5 different categories
  for (const category of shuffledCategories.slice(0, 5)) {
    const categoryExercises = availableMain.filter(
      (e) => e.category === category && !selectedMain.includes(e)
    );
    if (categoryExercises.length > 0) {
      selectedMain.push(
        categoryExercises[Math.floor(Math.random() * categoryExercises.length)]
      );
    }
  }

  // Fill to 5 if needed
  while (selectedMain.length < 5) {
    const remaining = availableMain.filter((e) => !selectedMain.includes(e));
    if (remaining.length === 0) break;
    selectedMain.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  // Select cooldown (avoid repeats if possible)
  const availableCooldowns = cooldownExercises.filter((c) => !usedCooldowns.has(c.id));
  const cooldown = availableCooldowns.length > 0
    ? availableCooldowns[Math.floor(Math.random() * availableCooldowns.length)]
    : cooldownExercises[Math.floor(Math.random() * cooldownExercises.length)];

  const mainBlocks: ExerciseBlock[] = selectedMain.map((exercise, index) => ({
    id: `${day}-main-${index}`,
    exercise,
    completed: false,
  }));

  return {
    session: {
      id: `session-${day}`,
      day,
      type: "fitness",
      warmup: {
        id: `${day}-warmup`,
        exercise: warmup,
        completed: false,
      },
      mainExercises: mainBlocks,
      cooldown: {
        id: `${day}-cooldown`,
        exercise: cooldown,
        completed: false,
      },
    },
    usedMainExercises: selectedMain,
  };
}

function generateSchedule(
  selectedDays: string[],
  sessionTypes: Record<string, "golf" | "fitness">
): Session[] {
  // Sort days by their position in the week
  const sortedDays = [...selectedDays].sort(
    (a, b) =>
      DAYS_OF_WEEK.indexOf(a as typeof DAYS_OF_WEEK[number]) -
      DAYS_OF_WEEK.indexOf(b as typeof DAYS_OF_WEEK[number])
  );

  const sessions: Session[] = [];
  let usedGolfDrills: Drill[] = [];
  let usedMainExercises: Exercise[] = [];
  const usedWarmups = new Set<string>();
  const usedCooldowns = new Set<string>();

  sortedDays.forEach((day, index) => {
    // Use sessionTypes map if available, fall back to alternating pattern
    const isGolf = sessionTypes[day]
      ? sessionTypes[day] === "golf"
      : index % 2 === 0;

    if (isGolf) {
      const availableDrills = golfDrills.filter(
        (d) => !usedGolfDrills.includes(d)
      );
      const { session, usedDrills } = generateGolfSession(
        day,
        availableDrills.length >= 4 ? availableDrills : golfDrills
      );
      sessions.push(session);
      usedGolfDrills = [...usedGolfDrills, ...usedDrills];
    } else {
      const availableMain = mainExercises.filter(
        (e) => !usedMainExercises.includes(e)
      );
      const { session, usedMainExercises: used } = generateFitnessSession(
        day,
        availableMain.length >= 5 ? availableMain : mainExercises,
        usedWarmups,
        usedCooldowns
      );
      sessions.push(session);
      usedMainExercises = [...usedMainExercises, ...used];
      usedWarmups.add(session.warmup.exercise.id);
      usedCooldowns.add(session.cooldown.exercise.id);
    }
  });

  return sessions;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_DAYS":
      return {
        ...state,
        selectedDays: action.payload,
      };

    case "SET_SESSION_TYPES":
      return {
        ...state,
        sessionTypes: action.payload,
      };

    case "GENERATE_SCHEDULE":
      return {
        ...state,
        schedule: generateSchedule(state.selectedDays, state.sessionTypes),
        setupComplete: true,
      };

    case "TOGGLE_BLOCK": {
      return {
        ...state,
        schedule: state.schedule.map((session) => {
          if (session.id !== action.payload.sessionId) return session;

          if (session.type === "golf") {
            return {
              ...session,
              blocks: session.blocks.map((block) =>
                block.id === action.payload.blockId
                  ? { ...block, completed: !block.completed }
                  : block
              ),
            };
          } else {
            if (session.warmup.id === action.payload.blockId) {
              return {
                ...session,
                warmup: { ...session.warmup, completed: !session.warmup.completed },
              };
            }
            if (session.cooldown.id === action.payload.blockId) {
              return {
                ...session,
                cooldown: { ...session.cooldown, completed: !session.cooldown.completed },
              };
            }
            return {
              ...session,
              mainExercises: session.mainExercises.map((block) =>
                block.id === action.payload.blockId
                  ? { ...block, completed: !block.completed }
                  : block
              ),
            };
          }
        }),
      };
    }

    case "REGENERATE_SESSION": {
      return {
        ...state,
        schedule: state.schedule.map((session) => {
          if (session.id !== action.payload.sessionId) return session;
          if (session.type === "golf") {
            const { session: newSession } = generateGolfSession(session.day, golfDrills);
            return { ...newSession, id: session.id };
          } else {
            const { session: newSession } = generateFitnessSession(
              session.day, mainExercises, new Set(), new Set()
            );
            return { ...newSession, id: session.id };
          }
        }),
      };
    }

    case "SWAP_BLOCK": {
      return {
        ...state,
        schedule: state.schedule.map((session) => {
          if (session.id !== action.payload.sessionId) return session;

          if (session.type === "golf") {
            return {
              ...session,
              blocks: session.blocks.map((block) => {
                if (block.id !== action.payload.blockId) return block;
                const usedIds = new Set(session.blocks.map((b) => b.drill.id));
                const sameCat = golfDrills.filter(
                  (d) => d.category === block.drill.category && !usedIds.has(d.id)
                );
                const pool = sameCat.length > 0
                  ? sameCat
                  : golfDrills.filter((d) => !usedIds.has(d.id));
                if (pool.length === 0) return block;
                return { ...block, drill: pool[Math.floor(Math.random() * pool.length)], completed: false };
              }),
            };
          } else {
            // Check warmup
            if (session.warmup.id === action.payload.blockId) {
              const usedId = session.warmup.exercise.id;
              const pool = warmupExercises.filter((e) => e.id !== usedId);
              if (pool.length === 0) return session;
              return {
                ...session,
                warmup: { ...session.warmup, exercise: pool[Math.floor(Math.random() * pool.length)], completed: false },
              };
            }
            // Check cooldown
            if (session.cooldown.id === action.payload.blockId) {
              const usedId = session.cooldown.exercise.id;
              const pool = cooldownExercises.filter((e) => e.id !== usedId);
              if (pool.length === 0) return session;
              return {
                ...session,
                cooldown: { ...session.cooldown, exercise: pool[Math.floor(Math.random() * pool.length)], completed: false },
              };
            }
            // Main exercises
            return {
              ...session,
              mainExercises: session.mainExercises.map((block) => {
                if (block.id !== action.payload.blockId) return block;
                const usedIds = new Set(session.mainExercises.map((b) => b.exercise.id));
                const sameCat = mainExercises.filter(
                  (e) => e.category === block.exercise.category && !usedIds.has(e.id)
                );
                const pool = sameCat.length > 0
                  ? sameCat
                  : mainExercises.filter((e) => !usedIds.has(e.id));
                if (pool.length === 0) return block;
                return { ...block, exercise: pool[Math.floor(Math.random() * pool.length)], completed: false };
              }),
            };
          }
        }),
      };
    }

    case "RESET":
    case "RESET_AND_ARCHIVE":
      return initialState;

    case "LOAD_STATE":
      // Backward compat: ensure sessionTypes exists
      return { ...initialState, ...action.payload, sessionTypes: action.payload.sessionTypes ?? {} };

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

const HISTORY_STORAGE_KEY = "four-hour-golfer-history";

function archiveCurrentWeek(state: AppState): void {
  if (state.schedule.length === 0) return;
  const entry: WeekHistory = {
    id: `week-${Date.now()}`,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    days: state.selectedDays,
    sessions: state.schedule,
    completionRate: calculateCompletion(state.schedule).percent,
  };
  try {
    const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
    const history: WeekHistory[] = saved ? JSON.parse(saved) : [];
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([entry, ...history]));
  } catch {
    // Ignore localStorage errors
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, rawDispatch] = useReducer(appReducer, initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const dispatch = useCallback((action: AppAction) => {
    if (action.type === "RESET_AND_ARCHIVE") {
      archiveCurrentWeek(stateRef.current);
    }
    rawDispatch(action);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AppState;
        rawDispatch({ type: "LOAD_STATE", payload: parsed });
      } catch {
        // Invalid saved state, use initial
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
