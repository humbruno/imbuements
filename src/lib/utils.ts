import { clsx, type ClassValue } from "clsx";
import { getDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

const SERVER_SAVE_HOUR = 10;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isBeforeServerSave() {
  const timeInGermany = getCurrentHourInGermany();
  return timeInGermany < SERVER_SAVE_HOUR;
}

function getCurrentHourInGermany() {
  const germanyTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(new Date());

  return Number(germanyTime);
}

export function getDayOfWeek() {
  const now = new Date();
  const yesterday = subDays(now, 1);
  return isBeforeServerSave() ? getDay(yesterday) : getDay(now);
}

type Result = "ingredients" | "gold tokens";

function calculate(numOfTokens: number) {
  return function (sum: number, tokenPrice: number): Result {
    return sum < tokenPrice * numOfTokens ? "ingredients" : "gold tokens";
  };
}

export const intricate = calculate(4);
export const powerful = calculate(6);

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  }).format(value);
}
