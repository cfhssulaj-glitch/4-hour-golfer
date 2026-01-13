import {
  createContext,
  useContext,
  useReducer,
  useEffect,
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
} from "@/types";
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

function generateSchedule(selectedDays: string[]): Session[] {
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
    const isGolf = index % 2 === 0;

    if (isGolf) {
      // Golf session: avoid drills used in previous golf session this week
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
      // Fitness session: avoid exercises used in previous fitness session this week
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

    case "GENERATE_SCHEDULE":
      return {
        ...state,
        schedule: generateSchedule(state.selectedDays),
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
            // Fitness session
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

    case "RESET":
      return initialState;

    case "LOAD_STATE":
      return action.payload;

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AppState;
        dispatch({ type: "LOAD_STATE", payload: parsed });
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
