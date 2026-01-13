# Claude Code Instructions

## Working Guidelines

1. First think through the problem, read the codebase for relevant files.
2. Before you make any major changes, check in with me and I will verify the plan.
3. Please every step of the way just give me a high level explanation of what changes you made
4. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
5. Maintain a documentation file that describes how the architecture of the app works inside and out.
6. Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer - give grounded and hallucination-free answers.

---

# App Architecture Documentation

## Overview

**4-Hour Golfer** is a React + TypeScript web app that generates weekly golf practice and fitness schedules. Users select 4 days per week, and the app alternates between golf practice sessions and TPI-based fitness sessions.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **LocalStorage** for state persistence

## Directory Structure

```
src/
├── App.tsx              # Root component, conditionally renders DaySelector or WeekSchedule
├── main.tsx             # Entry point
├── index.css            # Global styles and Tailwind imports
├── types/
│   └── index.ts         # All TypeScript interfaces and types
├── context/
│   └── AppContext.tsx   # Global state management (useReducer + Context)
├── data/
│   └── drills.ts        # Exercise and drill database
├── components/
│   ├── Header.tsx       # App header with reset button
│   ├── DaySelector.tsx  # Day selection UI (setup screen)
│   ├── WeekSchedule.tsx # Main schedule view with progress
│   ├── SessionCard.tsx  # Golf session display
│   ├── FitnessSessionCard.tsx  # Fitness session display
│   ├── DrillBlock.tsx   # Individual golf drill item
│   ├── ExerciseBlock.tsx # Individual exercise item
│   └── ui/              # Reusable UI primitives (Button, Checkbox)
└── lib/
    └── utils.ts         # Utility functions (cn for classnames)
```

## Data Flow

### State Management

All app state lives in `AppContext.tsx` using `useReducer`:

```typescript
interface AppState {
  selectedDays: string[];      // Which 4 days user selected
  schedule: Session[];         // Generated sessions for the week
  setupComplete: boolean;      // Whether to show schedule or day selector
}
```

**Actions:**
- `SET_DAYS` - Store selected days
- `GENERATE_SCHEDULE` - Create sessions based on selected days
- `TOGGLE_BLOCK` - Mark exercise/drill complete/incomplete
- `RESET` - Return to day selection
- `LOAD_STATE` - Restore from localStorage

### Schedule Generation Logic

Located in `AppContext.tsx`:

1. Days are sorted by week order (Monday first)
2. Sessions alternate: Golf (even index) → Fitness (odd index)
3. **Golf sessions**: 4 drills selected with category variety (Face Contact, Ground Contact, Face Direction, Putting, Short Game)
4. **Fitness sessions**: 1 warmup + 5 main exercises + 1 cooldown, with category variety
5. Previously used drills/exercises are tracked to avoid repetition within the week

### Persistence

State auto-saves to `localStorage` under key `four-hour-golfer-state` and restores on app load.

## Key Types

```typescript
// Golf drill from database
interface Drill {
  id: string;
  category: string;  // "Face Contact" | "Ground Contact" | "Face Direction" | "Putting" | "Short Game"
  name: string;
  description: string;
  source: string;
}

// Fitness exercise from database
interface Exercise {
  id: string;
  category: string;  // "Hip Mobility" | "Glute Activation" | "Anti-Sway" | etc.
  name: string;
  description: string;
  sets?: string;
  reps?: string;
  duration?: string;
  source: string;
}

// Wrapper with completion state
interface Block { id: string; drill: Drill; completed: boolean; }
interface ExerciseBlock { id: string; exercise: Exercise; completed: boolean; }

// Session types
interface GolfSession { type: "golf"; blocks: Block[]; ... }
interface FitnessSession { type: "fitness"; warmup: ExerciseBlock; mainExercises: ExerciseBlock[]; cooldown: ExerciseBlock; ... }
```

## Exercise Database

Located in `src/data/drills.ts`. Contains:

- `golfDrills[]` - 28 golf practice drills across 5 categories
- `warmupExercises[]` - 6 dynamic warmup exercises
- `mainExercises[]` - 45 TPI-based exercises across categories:
  - Hip Mobility
  - Glute Activation
  - Anti-Sway
  - Anti-Early Extension
  - T-Spine Mobility
  - Core Stability
  - Power
  - Explosive Rotation
  - Anti-Rotation
  - Stamina
- `cooldownExercises[]` - 6 cooldown/stretch exercises

All exercises sourced from TPI (Titleist Performance Institute).

## Component Responsibilities

| Component | Purpose |
|-----------|---------|
| `App.tsx` | Wraps everything in AppProvider, conditionally renders setup vs schedule |
| `DaySelector.tsx` | 7-day grid, max 4 selections, shows schedule preview |
| `WeekSchedule.tsx` | Overall progress bar, renders session cards |
| `SessionCard.tsx` | Expandable card for golf sessions, shows 4 drill blocks |
| `FitnessSessionCard.tsx` | Expandable card for fitness, shows warmup/main/cooldown |
| `DrillBlock.tsx` | Checkbox + drill name/description |
| `ExerciseBlock.tsx` | Checkbox + exercise with sets/reps/duration |

## UI Patterns

- Dark theme with slate backgrounds
- Emerald accent for golf/success states
- Amber accent for fitness sessions
- Cards are expandable/collapsible
- Progress tracked via checkboxes
- Mobile-first responsive design (max-w-lg container)
