import { readFromStorage, saveToStorage } from "@/lib/storage";
import { motion } from "motion/react";
import { toast } from "sonner";

export function GalthensSatchelWidget() {
  const storedData = readFromStorage();
  const lastSatchelDate = new Date(storedData.satchel).toLocaleDateString(
    "en-GB",
  );

  function updateSatchelDate() {
    saveToStorage({ satchel: new Date() });
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
      className="flex justify-end items-center"
    >
      <button
        onClick={updateSatchelDate}
        className="hover:bg-gray-700 transition-colors"
      >
        <img src="/galthens-satchel.gif" alt="Galthen's Satchel" />
      </button>
      <div className="pl-4">
        <p>Last sachel:</p>
        <p className="underline">{lastSatchelDate}</p>
      </div>
    </motion.div>
  );
}
