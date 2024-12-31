import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const STORAGE_KEY = "costs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDayOfWeek() {
  const today = new Date();
  const hour = today.getHours();

  if (hour < 9) {
    // account for server save at 9am (my local time)
    // refactor this to work on any timezone? idk
    return today.getDay() - 1;
  } else {
    return today.getDay();
  }
}

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
