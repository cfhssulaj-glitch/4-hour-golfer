import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "four-hour-golfer-notes";

export function useNotes() {
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const setNote = useCallback((id: string, text: string) => {
    setNotes((prev) => {
      if (!text) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: text };
    });
  }, []);

  const getNote = useCallback((id: string) => notes[id] || "", [notes]);

  return { notes, setNote, getNote };
}
