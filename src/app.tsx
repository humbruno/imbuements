import { GalthensSatchelWidget } from "@/components/galthens-satchel-widget";
import { GoldTokenInput } from "@/components/gold-token-input";
import { IngredientInput } from "@/components/ingredient-input";
import { RashidWidget } from "@/components/rashid-widget";
import { TabList } from "@/components/tab-list";
import { Toaster } from "@/components/ui/sonner";
import { INGREDIENTS } from "@/lib/constants";
import { useActiveTab } from "@/lib/hooks/use-active-tab";
import { readFromStorage, saveToStorage } from "@/lib/storage";
import { cn, intricate, powerful } from "@/lib/utils";
import { motion } from "motion/react";
import { FormEvent, PropsWithChildren, useEffect, useState } from "react";

export function App() {
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [tokenPrice, setTokenPrice] = useState(0);

  const showResult = total !== undefined;

  const { activeTab } = useActiveTab();
  const storedValues = readFromStorage();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const token = fd.get("Gold Token") as string;
    const goldTokenPrice = Number(token);

    const sum = INGREDIENTS[activeTab].reduce((prev, curr) => {
      const val = fd.get(curr.name) as string;
      return prev + curr.quantity * Number(val);
    }, 0);

    setTokenPrice(goldTokenPrice);
    setTotal(sum);
  }

  useEffect(() => {
    setTotal(undefined);
  }, [activeTab]);

  return (
    <main className="p-8 h-screen flex flex-col bg-black font-mono text-white">
      <section className="space-y-4">
        <RashidWidget />
        <GalthensSatchelWidget />
      </section>
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
              className="bg-white text-black  p-4 rounded-lg mt-4 hover:bg-gray-200"
            >
              Calculate
            </button>
          </form>
          {showResult && (
            <div className="mt-4">
              <p>
                Total Cost of Ingredients:{" "}
                <span className="underline text-yellow-400">{total}gp</span>{" "}
              </p>
              <p>
                <span className="font-semibold text-purple-500">
                  Intricate:{" "}
                </span>
                It is cheaper to buy using{" "}
                <span
                  className={cn("underline", {
                    "text-green-400":
                      intricate(total, tokenPrice) === "ingredients",
                    "text-yellow-400":
                      intricate(total, tokenPrice) === "gold token",
                  })}
                >
                  {intricate(total, tokenPrice)}
                </span>
              </p>
              <p>
                <span className="font-semibold text-rose-500">Powerful: </span>
                It is cheaper to buy using{" "}
                <span
                  className={cn("underline", {
                    "text-green-400":
                      intricate(total, tokenPrice) === "ingredients",
                    "text-yellow-400":
                      intricate(total, tokenPrice) === "gold token",
                  })}
                >
                  {powerful(total, tokenPrice)}
                </span>
              </p>
            </div>
          )}
        </Container>
      </div>
      <Toaster />
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
