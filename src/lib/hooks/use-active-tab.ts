import { type Tab } from "@/lib/constants";
import { useState } from "react";

const DEFAULT_TAB: Tab = "strike";

export function useActiveTab() {
  const [activeTab, setActiveTab] = useState<Tab>(DEFAULT_TAB);

  function setTab(tab: Tab) {
    setActiveTab(tab);
  }

  return { activeTab, setTab };
}
