import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md text-white bg-white px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zing-950 placeholder:text-zing-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zing-800 dark:bg-zinc-900 dark:ring-offset-zing-950 dark:file:text-zing-50 dark:placeholder:text-zing-400 dark:focus-visible:ring-zing-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
