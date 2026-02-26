import { useState, useCallback, useEffect } from "react";
import type { WeekHistory } from "@/types";

const STORAGE_KEY = "four-hour-golfer-history";

export function useHistory() {
  const [history, setHistory] = useState<WeekHistory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as WeekHistory[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, clearHistory };
}
