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

export function DaySelector() {
  const { dispatch } = useApp();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelected((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, day];
    });
  };

  const handleConfirm = () => {
    if (selected.length === 4) {
      dispatch({ type: "SET_DAYS", payload: selected });
      dispatch({ type: "GENERATE_SCHEDULE" });
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose Your 4 Days
        </h2>
        <p className="text-slate-400">
          Select the days you'll commit to your practice
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = selected.includes(day);
          const isDisabled = !isSelected && selected.length >= 4;

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
        <h3 className="text-sm font-medium text-slate-300 mb-3">
          Your Schedule Preview:
        </h3>
        <div className="space-y-2">
          {selected.length === 0 ? (
            <p className="text-slate-500 text-sm">Select 4 days to begin</p>
          ) : (
            [...selected]
              .sort(
                (a, b) =>
                  DAYS_OF_WEEK.indexOf(a as any) -
                  DAYS_OF_WEEK.indexOf(b as any)
              )
              .map((day, index) => (
                <div
                  key={day}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white">{day}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      index % 2 === 0
                        ? "bg-emerald-dark/30 text-emerald-300"
                        : "bg-amber-600/30 text-amber-300"
                    )}
                  >
                    {index % 2 === 0 ? "Golf Practice" : "Fitness"}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-400 mb-4">
          {selected.length}/4 days selected
        </p>
        <Button
          onClick={handleConfirm}
          disabled={selected.length !== 4}
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
