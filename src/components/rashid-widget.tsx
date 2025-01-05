import { RASHID } from "@/lib/constants";
import { getDayOfWeek } from "@/lib/utils";
import { motion } from "motion/react";

export function RashidWidget() {
  const today = getDayOfWeek();

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
      <img src="/rashid.gif" alt="Rashid" />
      <p>
        -&gt; <span className="underline">{RASHID[today]}</span>
      </p>
    </motion.div>
  );
}
