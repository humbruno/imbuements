import { TabList } from "@/components/tab-list";

export function App() {
  return (
    <main className="h-screen flex flex-col bg-black font-mono text-white">
      <div className="m-auto max-w-md space-y-10">
        <TabList />
        <div>
          <div className="flex gap-2 items-center">
            <img
              src="/gold-token.png"
              alt="gold token icon"
              className="size-8"
            />
            <p>Gold Token</p>
          </div>
        </div>
      </div>
    </main>
  );
}
