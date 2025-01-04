import goldToken from "@/assets/gold-token.png";
import grimeleechWings from "@/assets/some-grimeleech-wings.gif";
import { GalthensSatchelWidget } from "@/components/galthens-satchel-widget";
import { GoldTokenInput } from "@/components/gold-token-input";
import { IngredientInput } from "@/components/ingredient-input";
import { RashidWidget } from "@/components/rashid-widget";
import { TabList } from "@/components/tab-list";
import { Toaster } from "@/components/ui/sonner";
import { INGREDIENTS } from "@/lib/constants";
import { useActiveTab } from "@/lib/hooks/use-active-tab";
import { readFromStorage, saveToStorage } from "@/lib/storage";
import { cn, formatNumber, intricate, powerful } from "@/lib/utils";
import { motion } from "motion/react";
import { FormEvent, PropsWithChildren, useEffect, useState } from "react";

type ResultState =
  | {
      intricate: number;
      powerful: number;
      goldTokenPrice: number;
    }
  | undefined;

export function App() {
  const [result, setResult] = useState<ResultState>(undefined);

  const { activeTab } = useActiveTab();
  const storedValues = readFromStorage();

  const intricateResult =
    result !== undefined
      ? intricate(result?.intricate, result?.goldTokenPrice)
      : undefined;
  const powerfulResult =
    result !== undefined
      ? powerful(result?.powerful, result?.goldTokenPrice)
      : undefined;

  const showResult =
    result !== undefined && !!powerfulResult && !!intricateResult;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const token = fd.get("Gold Token") as string;

    const goldTokenPrice = token ? Number(token) : 0;
    let intricateSum = 0;
    let powerfulSum = 0;

    INGREDIENTS[activeTab].forEach((i) => {
      const val = fd.get(i.name) as string;
      const valAsInt = val ? Number(val) : 0;
      const ingredientTotal = valAsInt * i.quantity;

      powerfulSum += ingredientTotal;
      if (i.stage < 3) intricateSum += ingredientTotal;
    });

    setResult({
      intricate: intricateSum,
      powerful: powerfulSum,
      goldTokenPrice,
    });
  }

  useEffect(() => {
    setResult(undefined);
  }, [activeTab]);

  return (
    <main className="p-8 min-h-screen flex flex-col bg-black font-mono text-white">
      <section className="space-y-4">
        <RashidWidget />
        <GalthensSatchelWidget />
      </section>
      <div className="m-auto space-y-10">
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
              className="bg-white text-black focus-visible:underline focus-visible:outline-none p-4 rounded-lg mt-4 hover:bg-gray-200"
            >
              Calculate
            </button>
          </form>
          {showResult && (
            <div className="mt-4">
              <p>
                <span className="font-semibold text-purple-500">
                  Intricate:{" "}
                </span>
                It is cheaper to buy using{" "}
                <span
                  className={cn("underline", {
                    "text-green-400": intricateResult === "ingredients",
                    "text-yellow-400": intricateResult === "gold tokens",
                  })}
                >
                  {intricateResult}
                </span>
              </p>
              <p>
                (<img src={grimeleechWings} className="inline" />
                {formatNumber(result.intricate)}gp vs 4x
                <img src={goldToken} className="inline" />
                {formatNumber(result.goldTokenPrice * 4)}gp)
              </p>
              <p>
                <span className="font-semibold text-rose-500">Powerful: </span>
                It is cheaper to buy using{" "}
                <span
                  className={cn("underline", {
                    "text-green-400": powerfulResult === "ingredients",
                    "text-yellow-400": powerfulResult === "gold tokens",
                  })}
                >
                  {powerfulResult}
                </span>
              </p>
              <p>
                (<img src={grimeleechWings} className="inline" />
                {formatNumber(result.powerful)}gp vs 6x
                <img src={goldToken} className="inline" />
                {formatNumber(result.goldTokenPrice * 6)}gp)
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
