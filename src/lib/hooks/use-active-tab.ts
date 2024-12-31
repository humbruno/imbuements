import { type Tab } from "@/lib/constants";
import { useSearchParams } from "react-router";

const TAB_PARAM_KEY = "tab";
const DEFAULT_TAB: Record<string, Tab> = { [TAB_PARAM_KEY]: "strike" };

export function useActiveTab() {
  const [params, setParams] = useSearchParams(DEFAULT_TAB);
  const activeTab = params.get(TAB_PARAM_KEY) as Tab;

  function setTab(tab: Tab) {
    setParams((prev) => {
      prev.set(TAB_PARAM_KEY, tab);
      return prev;
    });
  }

  return { activeTab, setTab };
}
