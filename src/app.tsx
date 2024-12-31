import { GoldTokenInput } from "@/components/gold-token-input";
import { IngredientInput } from "@/components/ingredient-input";
import { RashidWidget } from "@/components/rashid-widget";
import { TabList } from "@/components/tab-list";
import { INGREDIENTS } from "@/lib/constants";
import { useActiveTab } from "@/lib/hooks/use-active-tab";
import { readFromStorage, saveToStorage } from "@/lib/utils";
import { motion } from "motion/react";
import { FormEvent, PropsWithChildren, useEffect, useState } from "react";

type Result = "Ingredients" | "Gold Token";

export function App() {
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const { activeTab } = useActiveTab();
  const storedValues = readFromStorage();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const goldTokenPrice = fd.get("Gold Token") as string;
    let sum = 0;

    INGREDIENTS[activeTab].forEach((ingredient) => {
      const val = fd.get(ingredient.name) as string;
      sum += ingredient.quantity * Number(val);
    });

    setTotal(sum);

    if (sum < Number(goldTokenPrice) * 6) {
      setResult("Ingredients");
    } else {
      setResult("Gold Token");
    }
  }

  useEffect(() => {
    setTotal(undefined);
    setResult(undefined);
  }, [activeTab]);

  return (
    <main className="p-8 h-screen flex flex-col bg-black font-mono text-white">
      <RashidWidget />
      <div className="m-auto max-w-md space-y-10">
        <TabList />
        <Container>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="bg-white text-black p-4 rounded-lg mt-4 hover:bg-gray-200"
            >
              Calculate
            </button>
          </form>
          {total !== undefined && (
            <div className="mt-4">
              <p>Total Cost of Ingredients: {total}gp</p>
            </div>
          )}
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
