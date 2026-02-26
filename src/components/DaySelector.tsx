import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { DAYS_OF_WEEK } from "@/types";
import { cn } from "@/lib/utils";

const DAY_ABBREV: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const MIN_DAYS = 3;
const MAX_DAYS = 5;

export function DaySelector() {
  const { dispatch } = useApp();
  const [selected, setSelected] = useState<string[]>([]);
  const [sessionTypes, setSessionTypes] = useState<Record<string, "golf" | "fitness">>({});

  const toggleDay = (day: string) => {
    setSelected((prev) => {
      if (prev.includes(day)) {
        const next = prev.filter((d) => d !== day);
        setSessionTypes((st) => {
          const copy = { ...st };
          delete copy[day];
          return copy;
        });
        return next;
      }
      if (prev.length >= MAX_DAYS) return prev;
      const next = [...prev, day];
      // Auto-assign type based on position when adding
      const sorted = [...next].sort(
        (a, b) =>
          DAYS_OF_WEEK.indexOf(a as any) - DAYS_OF_WEEK.indexOf(b as any)
      );
      const idx = sorted.indexOf(day);
      setSessionTypes((st) => ({
        ...st,
        [day]: idx % 2 === 0 ? "golf" : "fitness",
      }));
      return next;
    });
  };

  const toggleSessionType = (day: string) => {
    setSessionTypes((prev) => ({
      ...prev,
      [day]: prev[day] === "golf" ? "fitness" : "golf",
    }));
  };

  const sortedSelected = [...selected].sort(
    (a, b) =>
      DAYS_OF_WEEK.indexOf(a as any) - DAYS_OF_WEEK.indexOf(b as any)
  );

  const hasGolf = sortedSelected.some((d) => sessionTypes[d] === "golf");
  const hasFitness = sortedSelected.some((d) => sessionTypes[d] === "fitness");
  const canConfirm = selected.length >= MIN_DAYS && hasGolf && hasFitness;

  const handleConfirm = () => {
    if (!canConfirm) return;
    dispatch({ type: "SET_DAYS", payload: selected });
    dispatch({ type: "SET_SESSION_TYPES", payload: sessionTypes });
    dispatch({ type: "GENERATE_SCHEDULE" });
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose Your Days
        </h2>
        <p className="text-slate-400">
          Select {MIN_DAYS}-{MAX_DAYS} days for your practice week
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = selected.includes(day);
          const isDisabled = !isSelected && selected.length >= MAX_DAYS;

          return (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              disabled={isDisabled}
              className={cn(
                "relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 text-sm font-medium",
                isSelected
                  ? "bg-emerald-dark text-white ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-dark"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                isDisabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <span className="text-xs">{DAY_ABBREV[day]}</span>
              {isSelected && (
                <Check className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full p-0.5 text-white" />
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 mb-8">
        <h3 className="text-sm font-medium text-slate-300 mb-1">
          Your Schedule Preview:
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          Tap Golf/Fitness to change session type
        </p>
        <div className="space-y-2">
          {selected.length === 0 ? (
            <p className="text-slate-500 text-sm">Select {MIN_DAYS}-{MAX_DAYS} days to begin</p>
          ) : (
            sortedSelected.map((day) => {
              const type = sessionTypes[day] || "golf";
              return (
                <div
                  key={day}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white">{day}</span>
                  <button
                    onClick={() => toggleSessionType(day)}
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium transition-colors",
                      type === "golf"
                        ? "bg-emerald-dark/30 text-emerald-300 hover:bg-emerald-dark/50"
                        : "bg-amber-600/30 text-amber-300 hover:bg-amber-600/50"
                    )}
                  >
                    {type === "golf" ? "Golf Practice" : "Fitness"}
                  </button>
                </div>
              );
            })
          )}
        </div>
        {selected.length >= MIN_DAYS && (!hasGolf || !hasFitness) && (
          <p className="text-xs text-amber-400 mt-2">
            Need at least 1 Golf + 1 Fitness day
          </p>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-400 mb-4">
          {selected.length}/{MIN_DAYS}-{MAX_DAYS} days selected
        </p>
        <Button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="w-full"
          size="lg"
        >
          Start Training
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
