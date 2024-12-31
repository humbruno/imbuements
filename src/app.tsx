import { GoldTokenInput } from "@/components/gold-token-input";
import { IngredientInput } from "@/components/ingredient-input";
import { RashidWidget } from "@/components/rashid-widget";
import { TabList } from "@/components/tab-list";
import { INGREDIENTS } from "@/lib/constants";
import { useActiveTab } from "@/lib/hooks/use-active-tab";
import { motion } from "motion/react";
import { PropsWithChildren } from "react";
import { readFromStorage, saveToStorage } from "./lib/utils";

export function App() {
  const { activeTab } = useActiveTab();
  const storedValues = readFromStorage();

  return (
    <main className="p-8 h-screen flex flex-col bg-black font-mono text-white">
      <RashidWidget />
      <div className="m-auto max-w-md space-y-10">
        <TabList />
        <Container>
          <GoldTokenInput
            defaultValue={storedValues["Gold Token"]}
            onChange={(e) =>
              saveToStorage({ ["Gold Token"]: parseInt(e.target.value) })
            }
          />
          {INGREDIENTS[activeTab].map((v) => (
            <IngredientInput
              ingredient={v}
              key={v.name}
              defaultValue={storedValues[v.name]}
              onChange={(e) =>
                saveToStorage({ [v.name]: parseInt(e.target.value) })
              }
            />
          ))}
        </Container>
      </div>
    </main>
  );
}

function Container({ children }: PropsWithChildren) {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 30, opacity: 0 }}
      transition={{
        type: "spring",
        duration: 0.5,
        bounce: 0.6,
        delay: 0.4,
      }}
      className="mt-6"
    >
      {children}
    </motion.div>
  );
}
