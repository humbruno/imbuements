const STORAGE_KEY = "costs";

export function saveToStorage(data: object) {
  const stored = readFromStorage();
  return localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...stored, ...data }),
  );
}

export function readFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    return {};
  }
}
