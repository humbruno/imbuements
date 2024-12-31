import { NumberInput } from "@/components/number-input";
import { InputHTMLAttributes } from "react";

export function GoldTokenInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <img src="/gold-token.png" alt="gold token icon" className="size-8" />
        <p>Gold Token</p>
      </div>
      <div className="flex mt-2 items-center gap-2">
        <NumberInput placeholder="41781" {...props} />
        <p>gp</p>
      </div>
    </>
  );
}
