import { DatePicker } from "@/components/date-picker";
import { readFromStorage, saveToStorage } from "@/lib/storage";
import { addDays, format as formatDate, isPast } from "date-fns";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function GalthensSatchelWidget() {
  const storedData = readFromStorage();
  const initialState = storedData.satchel;

  const [satchelDate, setSatchelDate] = useState(initialState);

  const resolvedDate = satchelDate
    ? formatDate(satchelDate, "dd/MM/yyyy")
    : "Not Registered";

  const availableDate = addDays(satchelDate, 30);
  const isAvailable = isPast(availableDate);

  function updateSatchelDate(newDate: Date) {
    saveToStorage({ satchel: newDate });
    setSatchelDate(newDate);
    toast("Satchel date updated");
  }

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: 30, opacity: 0 }}
      transition={{
        type: "spring",
        duration: 0.5,
        bounce: 0.6,
        delay: 0.8,
      }}
      className="flex justify-end items-center relative"
    >
      <div className="relative">
        <DatePicker
          defaultDate={new Date(initialState)}
          onChange={updateSatchelDate}
        >
          <button className="hover:bg-gray-700 transition-colors">
            <img src="/galthens-satchel.gif" alt="Galthen's Satchel" />
          </button>
        </DatePicker>
        <img
          src="/click.png"
          aria-hidden={true}
          className="absolute -left-48 -bottom-14 select-none pointer-events-none max-w-52"
        />
      </div>
      <div className="pl-4">
        <p>Last satchel:</p>
        <p className="underline">{resolvedDate}</p>
        {isAvailable && (
          <p className="animate-pulse text-green-400">Available!</p>
        )}
      </div>
    </motion.div>
  );
}
