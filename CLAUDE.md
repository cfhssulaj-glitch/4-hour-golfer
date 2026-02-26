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

**4-Hour Golfer** is a React + TypeScript web app that generates weekly golf practice and fitness schedules. Users select 3-5 days per week, assign each day as golf or fitness (defaulting to alternating), and the app generates randomized sessions with variety.

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
├── App.tsx              # Root component, view router (schedule/history/assessment)
├── main.tsx             # Entry point
├── index.css            # Global styles and Tailwind imports
├── types/
│   ├── index.ts         # Core app interfaces (AppState, Session, WeekHistory, etc.)
│   └── assessment.ts    # TPI assessment types
├── context/
│   └── AppContext.tsx    # Global state management (useReducer + Context), handles archive-on-reset
├── hooks/
│   ├── useHistory.ts    # Read/clear weekly completion history from localStorage
│   ├── useAssessments.ts # TPI assessment CRUD
│   ├── useFavorites.ts  # Favorite drill/exercise toggle (Set<string>)
│   ├── useNotes.ts      # Per-drill/exercise user notes
│   └── useFrequency.ts  # Usage frequency tracking
├── data/
│   └── drills.ts        # Exercise and drill database
├── components/
│   ├── Header.tsx       # App header with navigation (history, assessment) and reset
│   ├── DaySelector.tsx  # Day selection UI (3-5 days, manual golf/fitness assignment)
│   ├── WeekSchedule.tsx # Main schedule view with progress
│   ├── SessionCard.tsx  # Expandable golf session card with swap/favorite/notes
│   ├── FitnessSessionCard.tsx  # Expandable fitness session card with swap/favorite/notes
│   ├── DrillBlock.tsx   # Individual golf drill with swap/favorite/notes controls
│   ├── ExerciseBlock.tsx # Individual exercise with swap/favorite/notes controls
│   ├── HistoryView.tsx  # Archived week completion history
│   ├── TPIAssessmentView.tsx # TPI benchmark entry and trend tracking
│   └── ui/              # Reusable UI primitives (Button, Checkbox)
└── lib/
    └── utils.ts         # Utility functions (cn, calculateCompletion)
```

## Data Flow

### State Management

**Core schedule state** lives in `AppContext.tsx` using `useReducer`:

```typescript
interface AppState {
  selectedDays: string[];      // 3-5 days user selected
  sessionTypes: Record<string, "golf" | "fitness">; // Manual session type override per day
  schedule: Session[];         // Generated sessions for the week
  setupComplete: boolean;      // Whether to show schedule or day selector
}
```

**Actions:**
- `SET_DAYS` - Store selected days
- `SET_SESSION_TYPES` - Override automatic golf/fitness alternation
- `GENERATE_SCHEDULE` - Create sessions based on selected days
- `TOGGLE_BLOCK` - Mark exercise/drill complete/incomplete
- `REGENERATE_SESSION` - Regenerate a single session's drills/exercises
- `SWAP_BLOCK` - Replace individual drill/exercise with random alternative from same category
- `RESET_AND_ARCHIVE` - Archive current week to history, then reset to day selection
- `RESET` - Return to day selection (without archiving)
- `LOAD_STATE` - Restore from localStorage

**Feature-specific state** uses isolated hooks with their own localStorage:
- `useHistory` - Read/clear archived week history
- `useAssessments` - TPI assessment records
- `useFavorites` - Favorited drill/exercise IDs (Set)
- `useNotes` - User notes keyed by drill/exercise ID

This split is intentional: core schedule data uses Context (shared across many components), while ancillary user preferences use isolated hooks (only needed by specific views).

### Schedule Generation Logic

Located in `AppContext.tsx`:

1. Days are sorted by week order (Monday first)
2. Sessions use manual types from `sessionTypes` map, falling back to alternating pattern (even=golf, odd=fitness)
3. **Golf sessions**: 4 drills selected with category variety (Face Contact, Ground Contact, Face Direction, Putting, Short Game)
4. **Fitness sessions**: 1 warmup + 5 main exercises + 1 cooldown, with category variety
5. Previously used drills/exercises are tracked to avoid repetition within the week

### Persistence

All data persists in `localStorage` under these keys:
- `four-hour-golfer-state` - Core app state (schedule, selected days, session types)
- `four-hour-golfer-history` - Archived week completions (written by AppContext on reset, read by useHistory)
- `four-hour-golfer-assessments` - TPI assessment records
- `four-hour-golfer-favorites` - Favorited drill/exercise IDs
- `four-hour-golfer-notes` - User notes by drill/exercise ID
- `four-hour-golfer-frequency` - Usage count per drill/exercise

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

// Archived week
interface WeekHistory { id: string; date: string; days: string[]; sessions: Session[]; completionRate: number; }

// TPI assessment (in types/assessment.ts)
interface TPIAssessment { id: string; date: string; verticalJump: number | null; /* ...12 more fields */ }
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
| `App.tsx` | Wraps in AppProvider, view router (schedule/history/assessment) |
| `Header.tsx` | App header with navigation buttons (history, assessment, reset) |
| `DaySelector.tsx` | Day selection UI (3-5 days, manual golf/fitness assignment per day) |
| `WeekSchedule.tsx` | Overall progress bar, renders session cards |
| `SessionCard.tsx` | Expandable golf session card with regenerate, swap, favorite, notes |
| `FitnessSessionCard.tsx` | Expandable fitness card with regenerate, swap, favorite, notes |
| `DrillBlock.tsx` | Golf drill item with swap/favorite/notes controls |
| `ExerciseBlock.tsx` | Exercise item with swap/favorite/notes controls |
| `HistoryView.tsx` | Displays archived week completion history with expandable entries |
| `TPIAssessmentView.tsx` | TPI benchmark entry form and trend tracking |

## UI Patterns

- Dark theme with slate backgrounds
- Emerald accent for golf/success states
- Amber accent for fitness sessions
- Cards are expandable/collapsible
- Progress tracked via checkboxes
- Mobile-first responsive design (max-w-lg container)
