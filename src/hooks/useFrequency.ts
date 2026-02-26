const STORAGE_KEY = "four-hour-golfer-frequency";

export function getFrequencyMap(): Record<string, number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function incrementFrequency(ids: string[]): void {
  const map = getFrequencyMap();
  for (const id of ids) {
    map[id] = (map[id] || 0) + 1;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}
