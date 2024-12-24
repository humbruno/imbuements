import { TabButton } from "@/components/tab-button";
import { TABS } from "@/lib/constants";
import { useActiveTab } from "@/lib/hooks/use-active-tab";
import { motion } from "motion/react";

export function TabList() {
  const { activeTab, setTab } = useActiveTab();

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.6, delay: 0.2 }}
      className="flex items-center bg-gray-600 rounded-lg overflow-hidden"
    >
      {TABS.map((v) => (
        <TabButton
          key={v}
          tab={v}
          active={activeTab === v}
          onClick={() => setTab(v)}
        />
      ))}
    </motion.div>
  );
}
