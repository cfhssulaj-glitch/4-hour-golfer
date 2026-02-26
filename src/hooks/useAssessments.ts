import { useState, useCallback, useEffect } from "react";
import type { TPIAssessment } from "@/types/assessment";

const STORAGE_KEY = "four-hour-golfer-assessments";

export function useAssessments() {
  const [assessments, setAssessments] = useState<TPIAssessment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as TPIAssessment[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
  }, [assessments]);

  const addAssessment = useCallback((assessment: TPIAssessment) => {
    setAssessments((prev) => [assessment, ...prev]);
  }, []);

  const deleteAssessment = useCallback((id: string) => {
    setAssessments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { assessments, addAssessment, deleteAssessment };
}
