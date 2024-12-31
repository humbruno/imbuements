import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

export function NumberInput(props: InputHTMLAttributes<HTMLInputElement>) {
  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^0-9]/g, "");
    props.onInput?.(e);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const invalidKeys = ["e", "E", "+", "-", ","];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
    props.onKeyDown?.(e);
  }

  return (
    <Input
      type="text"
      min={0}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      {...props}
    />
  );
}
