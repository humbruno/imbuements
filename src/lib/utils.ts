import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
